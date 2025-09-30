/**
 * Servicio de pagos con Conekta
 * Maneja todas las operaciones de pago usando la API de Conekta
 */

import { CONEKTA_CONFIG, initializeConekta, validateConektaConfig } from '../config/conekta.js'

class ConektaService {
  constructor() {
    this.conekta = null
    this.initialized = false
  }

  /**
   * Inicializar el servicio de Conekta
   */
  async initialize() {
    try {
      const validation = validateConektaConfig()
      if (!validation.isValid) {
        throw new Error(`Error de configuración: ${validation.errors.join(', ')}`)
      }

      this.conekta = await initializeConekta()
      this.initialized = true
      console.log('Conekta inicializado correctamente')
      return true
    } catch (error) {
      console.error('Error al inicializar Conekta:', error)
      throw error
    }
  }

  /**
   * Crear token para pago con tarjeta
   */
  async createCardToken(cardData) {
    if (!this.initialized) {
      await this.initialize()
    }

    return new Promise((resolve, reject) => {
      this.conekta.Token.create({
        card: {
          number: cardData.number.replace(/\s/g, ''),
          name: cardData.name,
          exp_year: cardData.expYear,
          exp_month: cardData.expMonth,
          cvc: cardData.cvc
        }
      }, (token) => {
        resolve(token)
      }, (error) => {
        reject(this.handleConektaError(error))
      })
    })
  }

  /**
   * Procesar pago con tarjeta
   */
  async processCardPayment(paymentData) {
    try {
      // 1. Crear token de tarjeta
      const token = await this.createCardToken(paymentData.card)
      
      // 2. Enviar al backend para procesar el pago
      const response = await fetch('/api/payments/conekta/card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token.id,
          amount: paymentData.amount,
          currency: CONEKTA_CONFIG.currency,
          description: `Donación - Nuestras Voces`,
          customer_info: {
            name: paymentData.customerInfo.name,
            email: paymentData.customerInfo.email,
            phone: paymentData.customerInfo.phone || ''
          },
          metadata: {
            project: 'nuestras-voces',
            reward_level: paymentData.metadata?.rewardLevel || null,
            message: paymentData.metadata?.message || ''
          }
        })
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Error en el pago')
      }

      return {
        success: true,
        transactionId: result.id,
        status: result.payment_status,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Error al procesar el pago'
      }
    }
  }

  /**
   * Crear pago OXXO
   */
  async createOxxoPayment(paymentData) {
    try {
      const response = await fetch('/api/payments/conekta/oxxo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: CONEKTA_CONFIG.currency,
          description: CONEKTA_CONFIG.oxxo.description,
          customer_info: {
            name: paymentData.customerInfo.name,
            email: paymentData.customerInfo.email,
            phone: paymentData.customerInfo.phone || ''
          },
          expires_at: this.getExpirationDate(CONEKTA_CONFIG.oxxo.expiresAt),
          metadata: {
            project: 'nuestras-voces',
            reward_level: paymentData.metadata?.rewardLevel || null,
            message: paymentData.metadata?.message || ''
          }
        })
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Error al generar referencia OXXO')
      }

      return {
        success: true,
        transactionId: result.id,
        reference: result.charges.data[0].payment_method.reference,
        barcode_url: result.charges.data[0].payment_method.barcode_url,
        expires_at: result.charges.data[0].payment_method.expires_at,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Error al crear pago OXXO'
      }
    }
  }

  /**
   * Crear pago SPEI (transferencia bancaria)
   */
  async createSpeiPayment(paymentData) {
    try {
      const response = await fetch('/api/payments/conekta/spei', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          currency: CONEKTA_CONFIG.currency,
          description: CONEKTA_CONFIG.spei.description,
          customer_info: {
            name: paymentData.customerInfo.name,
            email: paymentData.customerInfo.email,
            phone: paymentData.customerInfo.phone || ''
          },
          expires_at: this.getExpirationDate(CONEKTA_CONFIG.spei.expiresAt),
          metadata: {
            project: 'nuestras-voces',
            reward_level: paymentData.metadata?.rewardLevel || null,
            message: paymentData.metadata?.message || ''
          }
        })
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Error al generar SPEI')
      }

      return {
        success: true,
        transactionId: result.id,
        clabe: result.charges.data[0].payment_method.clabe,
        bank: result.charges.data[0].payment_method.bank,
        expires_at: result.charges.data[0].payment_method.expires_at,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Error al crear SPEI'
      }
    }
  }

  /**
   * Verificar estado de un pago
   */
  async getPaymentStatus(transactionId) {
    try {
      const response = await fetch(`/api/payments/conekta/status/${transactionId}`)
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Error al verificar pago')
      }

      return {
        success: true,
        status: result.payment_status,
        data: result
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Error al verificar estado del pago'
      }
    }
  }

  /**
   * Obtener información de comisiones
   */
  getFeesInfo(amount, paymentMethod = 'card') {
    const fees = {
      card: {
        percentage: 2.9,
        fixed: 350, // centavos
        description: '2.9% + $3.50 MXN'
      },
      oxxo: {
        percentage: 0,
        fixed: 1000, // centavos ($10 MXN)
        description: '$10 MXN'
      },
      spei: {
        percentage: 0,
        fixed: 800, // centavos ($8 MXN)  
        description: '$8 MXN'
      }
    }

    const methodFee = fees[paymentMethod] || fees.card
    const percentageFee = Math.round((amount * methodFee.percentage) / 100)
    const totalFee = percentageFee + methodFee.fixed
    
    return {
      percentage: methodFee.percentage,
      fixed: methodFee.fixed / 100, // convertir a pesos
      total: totalFee / 100, // convertir a pesos
      description: methodFee.description,
      amountPlusFees: (amount * 100 + totalFee) / 100
    }
  }

  /**
   * Utilidades privadas
   */
  getExpirationDate(days) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return Math.floor(date.getTime() / 1000) // Unix timestamp
  }

  handleConektaError(error) {
    const errorMessages = {
      'invalid_number': 'Número de tarjeta inválido',
      'invalid_expiry': 'Fecha de expiración inválida',
      'invalid_cvc': 'Código de seguridad inválido',
      'expired_card': 'La tarjeta ha expirado',
      'insufficient_funds': 'Fondos insuficientes',
      'card_declined': 'La tarjeta fue rechazada',
      'processing_error': 'Error de procesamiento, intenta nuevamente'
    }

    return new Error(errorMessages[error.message_to_purchaser] || error.message || 'Error en el pago')
  }

  /**
   * Validar datos de tarjeta
   */
  validateCardData(cardData) {
    const errors = []

    if (!cardData.number || cardData.number.replace(/\s/g, '').length < 13) {
      errors.push('Número de tarjeta inválido')
    }

    if (!cardData.name || cardData.name.trim().length < 3) {
      errors.push('Nombre del titular requerido')
    }

    if (!cardData.expMonth || !cardData.expYear) {
      errors.push('Fecha de expiración requerida')
    }

    if (!cardData.cvc || cardData.cvc.length < 3) {
      errors.push('Código de seguridad requerido')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Exportar instancia singleton
const conektaService = new ConektaService()
export default conektaService

// Exportar también la clase por si se necesita crear múltiples instancias
export { ConektaService }