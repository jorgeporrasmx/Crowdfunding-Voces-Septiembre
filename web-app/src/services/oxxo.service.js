import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from './firebaseClient'

/**
 * Oxxo Payment Service (Digital@FEMSA)
 * Usa Firebase Functions como proxy seguro para Digital@FEMSA
 */

const functions = getFunctions(app)

// Configurar emulador local si está en desarrollo
if (import.meta.env.DEV) {
  // connectFunctionsEmulator(functions, 'localhost', 5001)
}

class OxxoService {
  /**
   * Crear voucher de pago Oxxo
   */
  async createOxxoPayment({ amount, orderId, customerInfo, metadata = {} }) {
    try {
      const createOxxoPaymentFn = httpsCallable(functions, 'createOxxoPayment')

      const result = await createOxxoPaymentFn({
        amount,
        orderId,
        customerInfo,
        metadata
      })

      return result.data
    } catch (error) {
      // Firebase Functions errors tienen una estructura específica
      console.error('Error creating Oxxo payment:', {
        code: error?.code,
        message: error?.message,
        details: error?.details
      })

      // Extraer mensaje de error limpio
      let errorMessage = 'Error al generar el voucher de pago Oxxo'

      if (error?.code === 'functions/internal') {
        errorMessage = error?.message || 'Error interno del servidor'
      } else if (error?.code === 'functions/invalid-argument') {
        errorMessage = error?.message || 'Datos de pago inválidos'
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
   * Validar configuración
   * Nota: Las credenciales están en Firebase Secret Manager
   */
  isConfigured() {
    // Siempre retorna true ya que la validación se hace server-side
    return true
  }

  /**
   * Obtener información de configuración (sin exponer secretos)
   */
  getConfig() {
    return {
      isConfigured: this.isConfigured(),
      provider: 'Digital@FEMSA',
      paymentMethod: 'Oxxo',
      note: 'Credenciales almacenadas en Firebase Secret Manager'
    }
  }
}

// Exportar instancia singleton
const oxxoService = new OxxoService()
export default oxxoService
