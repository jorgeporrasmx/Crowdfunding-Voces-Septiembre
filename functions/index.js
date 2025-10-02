/**
 * Firebase Cloud Functions - Integración First Data Payment Gateway
 *
 * Este archivo contiene las Cloud Functions para integrar el gateway de pagos
 * First Data/Fiserv de forma segura.
 *
 * IMPLEMENTACIÓN SEGÚN DOCUMENTACIÓN FISERV LATAM
 * ================================================
 *
 * Autenticación HMAC SHA-256:
 * - Raw Signature = ApiKey + ClientRequestId + Timestamp + Payload
 * - Encoding: Base64 (NO hex)
 * - Headers requeridos: Api-Key, Timestamp, Message-Signature, Client-Request-Id
 *
 * Endpoints:
 * - Certification: https://cert.api.firstdata.com
 * - Production: https://prod.api.firstdata.com
 *
 * Configuración de Secrets en Firebase:
 * - FIRSTDATA_API_KEY: API Key de First Data
 * - FIRSTDATA_API_SECRET: Shared Secret para HMAC
 * - FIRSTDATA_STORE_ID: Store ID asignado
 * - FIRSTDATA_ENVIRONMENT: 'cert' o 'prod'
 *
 * Comandos para configurar secrets:
 * firebase functions:secrets:set FIRSTDATA_API_KEY
 * firebase functions:secrets:set FIRSTDATA_API_SECRET
 * firebase functions:secrets:set FIRSTDATA_STORE_ID
 * firebase functions:secrets:set FIRSTDATA_ENVIRONMENT
 *
 * Última actualización: 2025-10-02
 */

const functions = require('firebase-functions')
const { defineSecret } = require('firebase-functions/params')
const admin = require('firebase-admin')
const crypto = require('crypto')
const fetch = require('node-fetch')

admin.initializeApp()

// Configuración de First Data usando Secret Manager
const firstDataApiKey = defineSecret('FIRSTDATA_API_KEY')
const firstDataApiSecret = defineSecret('FIRSTDATA_API_SECRET')
const firstDataStoreId = defineSecret('FIRSTDATA_STORE_ID')
const firstDataEnvironment = defineSecret('FIRSTDATA_ENVIRONMENT')

const SITE_URL = 'https://nuestras-voces-crowdfunding.web.app'

/**
 * Generar firma HMAC SHA-256 para autenticación con First Data API
 *
 * Según documentación Fiserv LATAM:
 * Raw Signature = ApiKey + ClientRequestId + Timestamp + Payload
 * Encoding: Base64
 *
 * @param {string} apiKey - API Key de First Data
 * @param {string} apiSecret - Secret key de First Data para generar la firma
 * @param {string} clientRequestId - ID único del request del cliente
 * @param {string} timestamp - Timestamp del request en milisegundos (epoch)
 * @param {string} payload - Cuerpo del request en formato string
 * @returns {string} Firma HMAC en formato Base64
 */
function generateHMACSignature(apiKey, apiSecret, clientRequestId, timestamp, payload) {
  const rawSignature = apiKey + clientRequestId + timestamp + payload
  const hmac = crypto.createHmac('sha256', apiSecret)
  hmac.update(rawSignature)
  return hmac.digest('base64')
}

/**
 * Crear Payment URL en First Data Gateway
 *
 * Genera un URL de pago seguro a través del API de First Data/Fiserv.
 * Esta Cloud Function actúa como proxy seguro para proteger las credenciales del API.
 *
 * @function createPaymentUrl
 * @param {Object} request.data - Datos del request
 * @param {number} request.data.amount - Monto de la transacción (MXN)
 * @param {string} [request.data.currency='MXN'] - Código de moneda (ISO 4217)
 * @param {string} request.data.orderId - ID único de la orden/donación
 * @param {string} request.data.description - Descripción de la transacción
 * @param {Object} [request.data.metadata={}] - Metadatos adicionales
 * @param {string} [request.data.metadata.userName] - Nombre del usuario
 * @param {string} [request.data.metadata.userEmail] - Email del usuario
 * @param {string} [request.data.metadata.donationId] - ID de la donación
 * @param {string} [request.data.metadata.donorCode] - Código del donante
 *
 * @returns {Promise<Object>} Resultado de la operación
 * @returns {boolean} return.success - Indica si la operación fue exitosa
 * @returns {string} return.paymentUrl - URL para redireccionar al usuario al pago
 * @returns {string} return.orderId - ID de la orden confirmado por First Data
 * @returns {string} return.clientRequestId - ID del request del cliente
 *
 * @throws {functions.https.HttpsError} invalid-argument - Si faltan parámetros requeridos
 * @throws {functions.https.HttpsError} internal - Si hay error en la comunicación con First Data
 *
 * @example
 * const result = await createPaymentUrl({
 *   amount: 500,
 *   currency: 'MXN',
 *   orderId: 'DON-2025-ABC123',
 *   description: 'Donación para Nuestras Voces',
 *   metadata: { userName: 'Juan Pérez', userEmail: 'juan@example.com' }
 * })
 */
exports.createPaymentUrl = functions.https.onCall({
  cors: true,
  secrets: [firstDataApiKey, firstDataApiSecret, firstDataStoreId, firstDataEnvironment]
}, async (request) => {
  try {
    // En Functions v2, los datos vienen en request.data
    const data = request.data || request

    const { amount, currency, orderId, description, metadata } = data

    if (!amount || !orderId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'amount y orderId son requeridos'
      )
    }

    // Obtener valores de secrets
    const apiKey = firstDataApiKey.value()
    const apiSecret = firstDataApiSecret.value()
    const storeId = firstDataStoreId.value()
    const environment = firstDataEnvironment.value()

    const BASE_URL = environment === 'prod'
      ? 'https://prod.api.firstdata.com'
      : 'https://cert.api.firstdata.com'

    const timestamp = Date.now().toString()
    const requestPath = '/gateway/v2/payment-url'
    const clientRequestId = orderId

    const payload = JSON.stringify({
      transactionAmount: {
        total: parseFloat(amount).toFixed(2),
        currency: currency || 'MXN'
      },
      transactionType: 'SALE',
      orderId: orderId,
      billing: {
        name: metadata?.userName || 'Donante',
        email: metadata?.userEmail || ''
      },
      storeId: storeId,
      notificationUrl: `${SITE_URL}/api/webhooks/firstdata`,
      redirectUrl: `${SITE_URL}/donation-success?orderId=${orderId}`,
      cancelUrl: `${SITE_URL}/donation-cancelled`,
      merchantTransactionId: orderId
    })

    // Generar firma HMAC según especificación Fiserv LATAM
    const signature = generateHMACSignature(
      apiKey,
      apiSecret,
      clientRequestId,
      timestamp,
      payload
    )

    const response = await fetch(`${BASE_URL}${requestPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
        'Timestamp': timestamp,
        'Message-Signature': signature,
        'Client-Request-Id': clientRequestId
      },
      body: payload
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('First Data error:', errorData)
      throw new functions.https.HttpsError(
        'internal',
        errorData.message || `HTTP error! status: ${response.status}`
      )
    }

    const responseData = await response.json()

    return {
      success: true,
      paymentUrl: responseData.paymentUrl,
      orderId: responseData.orderId,
      clientRequestId: responseData.clientRequestId
    }
  } catch (error) {
    console.error('Error creating payment URL:', error.message)
    console.error('Error stack:', error.stack)

    // Extraer solo propiedades serializables del error
    const errorDetails = {
      message: error.message,
      code: error.code,
      name: error.name
    }
    console.error('Error details:', errorDetails)

    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Error al generar el link de pago'
    )
  }
})

/**
 * Verificar estado de transacción en First Data
 *
 * Consulta el estado actual de una transacción/pago en el gateway de First Data.
 * Útil para confirmar pagos completados o verificar el estado de pagos pendientes.
 *
 * @function checkTransactionStatus
 * @param {Object} request.data - Datos del request
 * @param {string} request.data.orderId - ID de la orden a consultar
 *
 * @returns {Promise<Object>} Resultado de la operación
 * @returns {boolean} return.success - Indica si la operación fue exitosa
 * @returns {string} return.status - Estado de la transacción (APPROVED, DECLINED, PENDING, etc.)
 * @returns {Object} return.transaction - Objeto completo con detalles de la transacción
 *
 * @throws {functions.https.HttpsError} invalid-argument - Si falta el orderId
 * @throws {functions.https.HttpsError} internal - Si hay error en la comunicación con First Data
 *
 * @example
 * const result = await checkTransactionStatus({
 *   orderId: 'DON-2025-ABC123'
 * })
 * if (result.status === 'APPROVED') {
 *   console.log('Pago completado exitosamente')
 * }
 */
exports.checkTransactionStatus = functions.https.onCall({
  cors: true,
  secrets: [firstDataApiKey, firstDataApiSecret, firstDataEnvironment]
}, async (request) => {
  try {
    // En Functions v2, los datos vienen en request.data
    const data = request.data || request
    const { orderId } = data

    if (!orderId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'orderId es requerido'
      )
    }

    // Obtener valores de secrets
    const apiKey = firstDataApiKey.value()
    const apiSecret = firstDataApiSecret.value()
    const environment = firstDataEnvironment.value()

    const BASE_URL = environment === 'prod'
      ? 'https://prod.api.firstdata.com'
      : 'https://cert.api.firstdata.com'

    const timestamp = Date.now().toString()
    const requestPath = `/gateway/v2/payments/${orderId}`
    const clientRequestId = `status-${orderId}`

    // Para GET requests, el payload está vacío
    const signature = generateHMACSignature(
      apiKey,
      apiSecret,
      clientRequestId,
      timestamp,
      ''
    )

    const response = await fetch(`${BASE_URL}${requestPath}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
        'Timestamp': timestamp,
        'Message-Signature': signature,
        'Client-Request-Id': clientRequestId
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new functions.https.HttpsError(
        'internal',
        errorData.message || `HTTP error! status: ${response.status}`
      )
    }

    const responseData = await response.json()

    return {
      success: true,
      status: responseData.transactionStatus,
      transaction: responseData
    }
  } catch (error) {
    console.error('Error checking transaction status:', error.message)
    console.error('Error stack:', error.stack)
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Error al verificar el estado de la transacción'
    )
  }
})
