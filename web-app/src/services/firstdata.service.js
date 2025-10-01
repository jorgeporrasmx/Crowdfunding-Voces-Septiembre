/**
 * First Data / Fiserv Payment Service
 * Maneja la integración con el gateway de pagos First Data
 */

const FIRSTDATA_CONFIG = {
  apiKey: import.meta.env.VITE_FIRSTDATA_API_KEY,
  apiSecret: import.meta.env.VITE_FIRSTDATA_API_SECRET,
  storeId: import.meta.env.VITE_FIRSTDATA_STORE_ID,
  environment: import.meta.env.VITE_FIRSTDATA_ENVIRONMENT || 'cert'
}

const BASE_URL = FIRSTDATA_CONFIG.environment === 'prod'
  ? 'https://prod.api.firstdata.com'
  : 'https://cert.api.firstdata.com'

class FirstDataService {
  /**
   * Generar firma HMAC para autenticación
   */
  async generateHMACSignature(method, contentType, timestamp, requestPath, payload = '') {
    const message = `${method}\n${contentType}\n${timestamp}\n${requestPath}\n${payload}`

    // En producción, esto debe hacerse en el backend por seguridad
    // Por ahora es solo un placeholder
    const encoder = new TextEncoder()
    const data = encoder.encode(message)
    const keyData = encoder.encode(FIRSTDATA_CONFIG.apiSecret)

    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )

    const signature = await crypto.subtle.sign('HMAC', key, data)
    const hashArray = Array.from(new Uint8Array(signature))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    return hashHex
  }

  /**
   * Crear Payment URL para procesamiento de pago
   */
  async createPaymentUrl({ amount, currency = 'MXN', orderId, description, metadata = {} }) {
    try {
      const timestamp = Date.now().toString()
      const requestPath = '/gateway/v2/payment-url'
      const method = 'POST'
      const contentType = 'application/json'

      const payload = JSON.stringify({
        transactionAmount: {
          total: parseFloat(amount).toFixed(2),
          currency: currency
        },
        transactionType: 'SALE',
        orderId: orderId,
        billing: {
          name: metadata.userName || 'Donante',
          email: metadata.userEmail || ''
        },
        storeId: FIRSTDATA_CONFIG.storeId,
        notificationUrl: `${import.meta.env.VITE_SITE_URL}/api/webhooks/firstdata`,
        redirectUrl: `${import.meta.env.VITE_SITE_URL}/donation-success`,
        cancelUrl: `${import.meta.env.VITE_SITE_URL}/donation-cancelled`,
        merchantTransactionId: orderId
      })

      const signature = await this.generateHMACSignature(
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
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return {
        success: true,
        paymentUrl: data.paymentUrl,
        orderId: data.orderId,
        clientRequestId: data.clientRequestId
      }
    } catch (error) {
      console.error('Error creating payment URL:', error)
      return {
        success: false,
        error: error.message || 'Error al generar el link de pago'
      }
    }
  }

  /**
   * Verificar estado de transacción
   */
  async checkTransactionStatus(orderId) {
    try {
      const timestamp = Date.now().toString()
      const requestPath = `/gateway/v2/payments/${orderId}`
      const method = 'GET'
      const contentType = 'application/json'

      const signature = await this.generateHMACSignature(
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
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return {
        success: true,
        status: data.transactionStatus,
        transaction: data
      }
    } catch (error) {
      console.error('Error checking transaction status:', error)
      return {
        success: false,
        error: error.message || 'Error al verificar el estado de la transacción'
      }
    }
  }

  /**
   * Validar configuración
   */
  isConfigured() {
    return !!(
      FIRSTDATA_CONFIG.apiKey &&
      FIRSTDATA_CONFIG.apiSecret &&
      FIRSTDATA_CONFIG.storeId &&
      FIRSTDATA_CONFIG.apiKey !== 'YOUR_API_KEY_HERE'
    )
  }

  /**
   * Obtener información de configuración (sin exponer secretos)
   */
  getConfig() {
    return {
      environment: FIRSTDATA_CONFIG.environment,
      isConfigured: this.isConfigured(),
      baseUrl: BASE_URL
    }
  }
}

// Exportar instancia singleton
const firstDataService = new FirstDataService()
export default firstDataService
