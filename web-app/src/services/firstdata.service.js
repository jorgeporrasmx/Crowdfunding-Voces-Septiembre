import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from './firebaseClient'

/**
 * First Data / Fiserv Payment Service
 * Usa Firebase Functions como proxy seguro para First Data
 */

const functions = getFunctions(app)

// Configurar emulador local si está en desarrollo
if (import.meta.env.DEV) {
  // connectFunctionsEmulator(functions, 'localhost', 5001)
}

class FirstDataService {
  /**
   * Crear Payment URL para procesamiento de pago
   */
  async createPaymentUrl({ amount, currency = 'MXN', orderId, description, metadata = {} }) {
    try {
      const createPaymentUrlFn = httpsCallable(functions, 'createPaymentUrl')

      const result = await createPaymentUrlFn({
        amount,
        currency,
        orderId,
        description,
        metadata
      })

      return result.data
    } catch (error) {
      // Firebase Functions errors tienen una estructura específica
      console.error('Error creating payment URL:', {
        code: error?.code,
        message: error?.message,
        details: error?.details
      })

      // Extraer mensaje de error limpio
      let errorMessage = 'Error al generar el link de pago'

      if (error?.code === 'functions/internal') {
        errorMessage = error?.message || 'Error interno del servidor'
      } else if (error?.code === 'functions/unauthenticated') {
        errorMessage = 'Error de autenticación'
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.code) {
        errorMessage = `Error: ${error.code}`
      }

      return {
        success: false,
        error: errorMessage
      }
    }
  }

  /**
   * Verificar estado de transacción
   */
  async checkTransactionStatus(orderId) {
    try {
      const checkStatusFn = httpsCallable(functions, 'checkTransactionStatus')

      const result = await checkStatusFn({ orderId })

      return result.data
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
   * Nota: Las credenciales ahora están en Firebase Secret Manager
   * Este método siempre retorna true ya que la validación se hace server-side
   */
  isConfigured() {
    return true
  }

  /**
   * Obtener información de configuración (sin exponer secretos)
   */
  getConfig() {
    return {
      isConfigured: this.isConfigured(),
      note: 'Credenciales almacenadas en Firebase Secret Manager'
    }
  }
}

// Exportar instancia singleton
const firstDataService = new FirstDataService()
export default firstDataService
