const functions = require('firebase-functions')
const admin = require('firebase-admin')
const crypto = require('crypto')
const fetch = require('node-fetch')

admin.initializeApp()

// Configuración de First Data (hardcoded por ahora, moveremos a Secret Manager después)
const FIRSTDATA_CONFIG = {
  apiKey: '6299022',
  apiSecret: 'R]4hwv3nG%tE',
  storeId: '6299022',
  environment: 'cert'
}

const SITE_URL = 'https://nuestras-voces-crowdfunding.web.app'

const BASE_URL = FIRSTDATA_CONFIG.environment === 'prod'
  ? 'https://prod.api.firstdata.com'
  : 'https://cert.api.firstdata.com'

/**
 * Generar firma HMAC para autenticación con First Data
 */
function generateHMACSignature(method, contentType, timestamp, requestPath, payload = '') {
  const message = `${method}\n${contentType}\n${timestamp}\n${requestPath}\n${payload}`
  const hmac = crypto.createHmac('sha256', FIRSTDATA_CONFIG.apiSecret)
  hmac.update(message)
  return hmac.digest('hex')
}

/**
 * Crear Payment URL en First Data
 */
exports.createPaymentUrl = functions.https.onCall({ cors: true }, async (request) => {
  try {
    // En Functions v2, los datos vienen en request.data
    const data = request.data || request

    console.log('createPaymentUrl called with:', {
      amount: data.amount,
      currency: data.currency,
      orderId: data.orderId,
      description: data.description
    })

    const { amount, currency, orderId, description, metadata } = data

    if (!amount || !orderId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'amount y orderId son requeridos'
      )
    }

    console.log('Creating payment URL for order:', orderId, 'amount:', amount)

    const timestamp = Date.now().toString()
    const requestPath = '/gateway/v2/payment-url'
    const method = 'POST'
    const contentType = 'application/json'

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
      storeId: FIRSTDATA_CONFIG.storeId,
      notificationUrl: `${SITE_URL}/api/webhooks/firstdata`,
      redirectUrl: `${SITE_URL}/donation-success?orderId=${orderId}`,
      cancelUrl: `${SITE_URL}/donation-cancelled`,
      merchantTransactionId: orderId
    })

    const signature = generateHMACSignature(
      method,
      contentType,
      timestamp,
      requestPath,
      payload
    )

    const response = await fetch(`${BASE_URL}${requestPath}`, {
      method: method,
      headers: {
        'Content-Type': contentType,
        'Api-Key': FIRSTDATA_CONFIG.apiKey,
        'Timestamp': timestamp,
        'Message-Signature': signature,
        'Client-Request-Id': orderId
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
 * Verificar estado de transacción
 */
exports.checkTransactionStatus = functions.https.onCall({ cors: true }, async (request) => {
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

    const timestamp = Date.now().toString()
    const requestPath = `/gateway/v2/payments/${orderId}`
    const method = 'GET'
    const contentType = 'application/json'

    const signature = generateHMACSignature(
      method,
      contentType,
      timestamp,
      requestPath
    )

    const response = await fetch(`${BASE_URL}${requestPath}`, {
      method: method,
      headers: {
        'Content-Type': contentType,
        'Api-Key': FIRSTDATA_CONFIG.apiKey,
        'Timestamp': timestamp,
        'Message-Signature': signature,
        'Client-Request-Id': `status-${orderId}`
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
