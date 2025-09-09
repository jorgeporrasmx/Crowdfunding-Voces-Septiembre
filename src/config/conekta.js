/**
 * Configuración de Conekta para pagos
 * Documentación: https://developers.conekta.com
 */

// Configuración de ambiente
const isProduction = process.env.NODE_ENV === 'production'

export const CONEKTA_CONFIG = {
  // Llaves públicas (seguras para frontend)
  publicKey: isProduction 
    ? process.env.VITE_CONEKTA_PUBLIC_KEY_LIVE 
    : process.env.VITE_CONEKTA_PUBLIC_KEY_TEST || 'key_test_KJm5eDzp93b6MjPHoJXzZaWwUkwMiJPe8',
  
  // Configuración del API
  apiUrl: isProduction 
    ? 'https://api.conekta.io' 
    : 'https://api.conekta.io',
  
  // Versión del API
  apiVersion: '2.0.0',
  
  // Moneda por defecto
  currency: 'MXN',
  
  // Configuración de OXXO
  oxxo: {
    expiresAt: 7, // días
    description: 'Donación - Nuestras Voces'
  },
  
  // Configuración de SPEI
  spei: {
    expiresAt: 3, // días
    description: 'Donación - Nuestras Voces'
  },
  
  // URLs de webhook (configurar en backend)
  webhooks: {
    success: '/api/webhooks/conekta/success',
    failed: '/api/webhooks/conekta/failed',
    pending: '/api/webhooks/conekta/pending'
  },
  
  // Configuración de checkout
  checkout: {
    successUrl: `${window.location.origin}/donation-success`,
    failureUrl: `${window.location.origin}/donation-failed`,
    monthly_installments: [3, 6, 9, 12] // Meses sin intereses disponibles
  }
}

// Función para validar la configuración
export const validateConektaConfig = () => {
  const errors = []
  
  if (!CONEKTA_CONFIG.publicKey) {
    errors.push('Falta la llave pública de Conekta')
  }
  
  if (CONEKTA_CONFIG.publicKey && !CONEKTA_CONFIG.publicKey.startsWith('key_')) {
    errors.push('La llave pública de Conekta no tiene el formato correcto')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Función para inicializar Conekta
export const initializeConekta = () => {
  return new Promise((resolve, reject) => {
    // Verificar si ya está cargado
    if (window.Conekta) {
      window.Conekta.setPublicKey(CONEKTA_CONFIG.publicKey)
      resolve(window.Conekta)
      return
    }
    
    // Cargar el script de Conekta
    const script = document.createElement('script')
    script.src = 'https://cdn.conekta.io/js/latest/conekta.js'
    script.onload = () => {
      if (window.Conekta) {
        window.Conekta.setPublicKey(CONEKTA_CONFIG.publicKey)
        resolve(window.Conekta)
      } else {
        reject(new Error('Error al cargar Conekta'))
      }
    }
    script.onerror = () => reject(new Error('Error al cargar el script de Conekta'))
    document.head.appendChild(script)
  })
}

export default CONEKTA_CONFIG