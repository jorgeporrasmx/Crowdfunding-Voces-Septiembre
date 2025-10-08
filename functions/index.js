/**
 * Firebase Cloud Functions - Integración Fiserv CONNECT WebCheckout
 *
 * Este archivo contiene las Cloud Functions para integrar el gateway de pagos
 * Fiserv CONNECT WebCheckout (Hosted Payment Page) para LATAM.
 *
 * IMPLEMENTACIÓN WEBCHECKOUT
 * ==========================
 *
 * Autenticación HMAC SHA-256 para WebCheckout:
 * - Los parámetros se concatenan en ORDEN ALFABÉTICO separados por pipe (|)
 * - Se genera HMAC SHA-256 usando SharedSecret como key
 * - Se codifica en Base64
 * - El hash se envía como parámetro "hashExtended" en el formulario
 *
 * Endpoints:
 * - Test: https://test.ipg-online.com/connect/gateway/processing
 * - Production: https://www2.ipg-online.com/connect/gateway/processing
 *
 * Configuración de Secrets en Firebase:
 * - FIRSTDATA_STORE_ID: Store ID asignado (6299022)
 * - FIRSTDATA_API_SECRET: Shared Secret para HMAC (R]4hwv3nG%tE)
 * - FIRSTDATA_ENVIRONMENT: 'test' o 'prod'
 *
 * Comandos para configurar secrets:
 * firebase functions:secrets:set FIRSTDATA_STORE_ID
 * firebase functions:secrets:set FIRSTDATA_API_SECRET
 * firebase functions:secrets:set FIRSTDATA_ENVIRONMENT
 *
 * Última actualización: 2025-10-02
 */

const functions = require('firebase-functions')
const { defineSecret } = require('firebase-functions/params')
const admin = require('firebase-admin')
const crypto = require('crypto')
const fetch = require('node-fetch')
const { OrdersApi, Configuration } = require('digitalfemsa')

admin.initializeApp()

// Configuración de Fiserv CONNECT WebCheckout usando Secret Manager
const fiservStoreId = defineSecret('FIRSTDATA_STORE_ID')
const fiservSharedSecret = defineSecret('FIRSTDATA_API_SECRET')
const fiservEnvironment = defineSecret('FIRSTDATA_ENVIRONMENT')

// Configuración de Digital@FEMSA (Oxxo Pay) usando Secret Manager
const digitalFEMSAApiKey = defineSecret('DIGITALFEMSA_API_KEY')
const digitalFEMSAEnvironment = defineSecret('DIGITALFEMSA_ENVIRONMENT')

const SITE_URL = 'https://nuestras-voces-crowdfunding.web.app'

/**
 * Generar firma HMAC SHA-256 para WebCheckout
 *
 * Según documentación Fiserv CONNECT WebCheckout:
 * 1. Ordenar parámetros alfabéticamente (excluyendo sharedsecret y hashExtended)
 * 2. Concatenar VALORES con pipe (|)
 * 3. Generar HMAC SHA-256 con SharedSecret
 * 4. Codificar en Base64
 *
 * @param {Object} params - Objeto con parámetros del formulario
 * @param {string} sharedSecret - Shared Secret de Fiserv
 * @returns {string} Firma HMAC en formato Base64
 */
function generateWebCheckoutHash(params, sharedSecret) {
  // Ordenar parámetros alfabéticamente por nombre de campo
  const sortedKeys = Object.keys(params).sort()

  // Concatenar VALORES con pipe (|)
  const concatenatedValues = sortedKeys.map(key => params[key]).join('|')

  // Generar HMAC SHA-256
  const hmac = crypto.createHmac('sha256', sharedSecret)
  hmac.update(concatenatedValues)

  // Retornar en Base64
  return hmac.digest('base64')
}

/**
 * Generar parámetros de formulario para Fiserv CONNECT WebCheckout
 *
 * Genera los parámetros necesarios incluyendo el hash HMAC para el formulario
 * de WebCheckout que redirige al usuario a la página de pago de Fiserv.
 *
 * @function createPaymentUrl
 * @param {Object} request.data - Datos del request
 * @param {number} request.data.amount - Monto de la transacción (MXN)
 * @param {string} request.data.orderId - ID único de la orden/donación
 * @param {Object} [request.data.metadata={}] - Metadatos adicionales
 *
 * @returns {Promise<Object>} Resultado de la operación
 * @returns {boolean} return.success - Indica si la operación fue exitosa
 * @returns {string} return.paymentUrl - URL del gateway de Fiserv para POST
 * @returns {Object} return.formParams - Parámetros del formulario incluyendo hashExtended
 *
 * @throws {functions.https.HttpsError} invalid-argument - Si faltan parámetros requeridos
 *
 * @example
 * const result = await createPaymentUrl({
 *   amount: 500,
 *   orderId: 'DON-2025-ABC123',
 *   metadata: { userName: 'Juan Pérez', userEmail: 'juan@example.com' }
 * })
 */
exports.createPaymentUrl = functions.https.onCall({
  cors: true,
  secrets: [fiservStoreId, fiservSharedSecret, fiservEnvironment]
}, async (request) => {
  try {
    const data = request.data || request
    const { amount, orderId, metadata } = data

    if (!amount || !orderId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'amount y orderId son requeridos'
      )
    }

    // Obtener valores de secrets
    const storeId = fiservStoreId.value()
    const sharedSecret = fiservSharedSecret.value()
    const environment = fiservEnvironment.value()

    // URL del gateway según ambiente
    const paymentUrl = environment === 'prod'
      ? 'https://www2.ipg-online.com/connect/gateway/processing'
      : 'https://test.ipg-online.com/connect/gateway/processing'

    // Generar fecha y hora en formato requerido (YYYY:MM:DD-HH:MM:SS en timezone America/Mexico_City)
    const now = new Date()
    const mexicoTime = now.toLocaleString('en-US', {
      timeZone: 'America/Mexico_City',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })

    // Parsear y formatear a YYYY:MM:DD-HH:MM:SS
    const [datePart, timePart] = mexicoTime.split(', ')
    const [month, day, year] = datePart.split('/')
    const txndatetime = `${year}:${month}:${day}-${timePart}`

    // Parámetros para el hash - TODOS los que se enviarán (excepto sharedsecret y hashExtended)
    // NOTA: hash_algorithm DEBE incluirse en el cálculo del hash
    const hashParams = {
      chargetotal: parseFloat(amount).toFixed(2),
      checkoutoption: 'combinedpage',
      currency: '484', // MXN
      hash_algorithm: 'HMACSHA256', // ← DEBE estar en el hash
      oid: orderId,
      responseFailURL: `${SITE_URL}/donation-cancelled?orderId=${orderId}`,
      responseSuccessURL: `${SITE_URL}/donation-success?orderId=${orderId}`,
      storename: storeId,
      timezone: 'America/Mexico_City',
      txndatetime: txndatetime,
      txntype: 'sale'
    }

    // Generar hash HMAC con TODOS los parámetros (incluido hash_algorithm)
    const hashExtended = generateWebCheckoutHash(hashParams, sharedSecret)

    // Los parámetros del formulario son los mismos que se usaron para el hash
    const formParams = hashParams

    console.log('=== WebCheckout Debug ===')
    console.log('Payment URL:', paymentUrl)
    console.log('Store ID:', storeId)
    console.log('Shared Secret:', sharedSecret)
    console.log('Order ID:', orderId)
    console.log('Amount:', formParams.chargetotal)
    console.log('Transaction datetime:', txndatetime)
    console.log('Hash params (for HMAC):', hashParams)
    console.log('Hash Extended:', hashExtended)
    console.log('Form params (complete):', formParams)

    return {
      success: true,
      paymentUrl,
      formParams: {
        ...formParams,
        hashExtended
      }
    }
  } catch (error) {
    console.error('Error generating WebCheckout params:', error.message)
    console.error('Error stack:', error.stack)

    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Error al generar parámetros de pago'
    )
  }
})

/**
 * Verificar estado de transacción en First Data
 *
 * NOTA: Esta función no está disponible para WebCheckout.
 * WebCheckout utiliza callbacks (responseSuccessURL/responseFailURL) para notificar
 * el resultado de la transacción. El estado se actualiza automáticamente cuando
 * el usuario es redirigido a la página de éxito.
 *
 * Esta función se mantiene deshabilitada para futuras implementaciones con REST API.
 */

// exports.checkTransactionStatus = functions.https.onCall({
//   cors: true,
//   secrets: [fiservStoreId, fiservSharedSecret, fiservEnvironment]
// }, async (request) => {
//   throw new functions.https.HttpsError(
//     'unimplemented',
//     'checkTransactionStatus no está disponible para WebCheckout. Use los callbacks de success/fail.'
//   )
// })

/**
 * Crear pago con Oxxo usando Digital@FEMSA
 *
 * Genera un voucher de pago para Oxxo que el usuario puede pagar en cualquier
 * tienda Oxxo. El pago tiene una expiración de 3 días y se confirma mediante webhook.
 *
 * @function createOxxoPayment
 * @param {Object} request.data - Datos del request
 * @param {number} request.data.amount - Monto de la transacción (MXN)
 * @param {string} request.data.orderId - ID único de la orden/donación
 * @param {Object} request.data.customerInfo - Información del cliente
 * @param {string} request.data.customerInfo.name - Nombre del cliente
 * @param {string} request.data.customerInfo.email - Email del cliente
 * @param {string} request.data.customerInfo.phone - Teléfono del cliente
 * @param {Object} [request.data.metadata={}] - Metadatos adicionales
 *
 * @returns {Promise<Object>} Resultado de la operación
 * @returns {boolean} return.success - Indica si la operación fue exitosa
 * @returns {string} return.oxxoReference - Referencia de pago Oxxo
 * @returns {string} return.oxxoBarcodeUrl - URL del código de barras
 * @returns {string} return.expiresAt - Fecha de expiración del voucher
 *
 * @throws {functions.https.HttpsError} invalid-argument - Si faltan parámetros requeridos
 * @throws {functions.https.HttpsError} internal - Si hay error en la comunicación con Digital@FEMSA
 *
 * @example
 * const result = await createOxxoPayment({
 *   amount: 500,
 *   orderId: 'DON-2025-ABC123',
 *   customerInfo: {
 *     name: 'Juan Pérez',
 *     email: 'juan@example.com',
 *     phone: '+5215555555555'
 *   }
 * })
 */
exports.createOxxoPayment = functions.https.onCall({
  cors: true,
  secrets: [digitalFEMSAApiKey, digitalFEMSAEnvironment]
}, async (request) => {
  try {
    const data = request.data || request
    const { amount, orderId, customerInfo, metadata = {} } = data

    // Validar parámetros requeridos
    if (!amount || !orderId || !customerInfo) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'amount, orderId y customerInfo son requeridos'
      )
    }

    if (!customerInfo.name || !customerInfo.email) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'customerInfo debe incluir name y email'
      )
    }

    // Obtener valores de secrets
    const apiKey = digitalFEMSAApiKey.value()
    const environment = digitalFEMSAEnvironment.value()

    // Configurar SDK de Digital@FEMSA
    const config = new Configuration({
      accessToken: apiKey
    })

    const ordersApi = new OrdersApi(config)

    // Crear orden con pago en efectivo (Oxxo)
    const orderRequest = {
      currency: 'MXN',
      customer_info: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone || '+5215555555555'
      },
      line_items: [{
        name: `Donación - ${orderId}`,
        unit_price: Math.round(amount * 100), // Convertir a centavos
        quantity: 1
      }],
      charges: [{
        payment_method: {
          type: 'oxxo_cash',
          expires_at: Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60) // 3 días
        }
      }],
      metadata: {
        ...metadata,
        orderId,
        donationId: orderId
      }
    }

    console.log('=== Oxxo Payment Debug ===')
    console.log('Environment:', environment)
    console.log('Order ID:', orderId)
    console.log('Amount (centavos):', Math.round(amount * 100))
    console.log('Customer:', customerInfo.name)

    // Crear orden en Digital@FEMSA
    const orderResponse = await ordersApi.createOrder(orderRequest)
    const order = orderResponse.data

    console.log('Digital@FEMSA Order created:', order.id)

    // Extraer información del voucher Oxxo
    const charge = order.charges?.data?.[0]
    const oxxoInfo = charge?.payment_method

    if (!oxxoInfo || !oxxoInfo.reference) {
      throw new functions.https.HttpsError(
        'internal',
        'No se pudo generar el voucher de Oxxo'
      )
    }

    console.log('Oxxo Reference:', oxxoInfo.reference)
    console.log('Barcode URL:', oxxoInfo.barcode_url)

    return {
      success: true,
      oxxoReference: oxxoInfo.reference,
      oxxoBarcodeUrl: oxxoInfo.barcode_url,
      expiresAt: new Date(oxxoInfo.expires_at * 1000).toISOString(),
      orderId: order.id,
      amount: amount
    }
  } catch (error) {
    console.error('Error creating Oxxo payment:', error.message)
    console.error('Error details:', error.response?.data || error.stack)

    // Manejar errores de Digital@FEMSA
    if (error.response?.data) {
      throw new functions.https.HttpsError(
        'internal',
        error.response.data.details?.[0]?.message || error.response.data.message || 'Error al crear pago Oxxo'
      )
    }

    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Error al crear pago Oxxo'
    )
  }
})
