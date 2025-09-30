import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { formatMoney } from '../utils/formatMoney'

const PaymentMethods = ({ amount, onPaymentSuccess, onPaymentError, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  })

  const paymentMethods = [
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Pago rápido y seguro con Touch ID o Face ID',
      processingTime: 'Inmediato',
      fees: '2.9%',
      available: true,
      popular: true
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: '🤖',
      description: 'Pago seguro con tu cuenta de Google',
      processingTime: 'Inmediato',
      fees: '2.9%',
      available: true,
      popular: true
    },
    {
      id: 'conekta',
      name: 'Conekta',
      icon: '💳',
      description: 'Pagos con tarjeta de crédito/débito en México',
      processingTime: 'Inmediato',
      fees: '2.9% + $3.50',
      available: true
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      icon: '🛒',
      description: 'Pagos seguros con Mercado Pago',
      processingTime: '24-48 horas',
      fees: '3.5%',
      available: true
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: '💳',
      description: 'Pagos internacionales con tarjeta',
      processingTime: '2-3 días',
      fees: '2.9% + $0.30',
      available: true
    },
    {
      id: 'oxxo',
      name: 'OXXO Pay',
      icon: '🏪',
      description: 'Pago en efectivo en tiendas OXXO',
      processingTime: '1-24 horas',
      fees: '$10 MXN',
      available: true
    },
    {
      id: 'crypto',
      name: 'Criptomonedas',
      icon: '₿',
      description: 'Bitcoin, Ethereum y otras criptomonedas',
      processingTime: '10-30 minutos',
      fees: '1%',
      available: true
    },
    {
      id: 'bank',
      name: 'Transferencia Bancaria',
      icon: '🏦',
      description: 'Transferencia directa a cuenta bancaria',
      processingTime: '1-3 días',
      fees: 'Sin comisión',
      available: true
    }
  ]

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId)
  }

  const handleInputChange = (field, value) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : v
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const simulatePayment = async (method) => {
    setIsProcessing(true)
    
    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simular diferentes respuestas según el método
    const successRate = Math.random()
    
    if (successRate > 0.1) { // 90% de éxito
      const transactionId = `${method.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      onPaymentSuccess(method, transactionId)
    } else {
      const errors = [
        'Tarjeta declinada',
        'Fondos insuficientes',
        'Error de conexión',
        'Tarjeta expirada',
        'CVV incorrecto'
      ]
      onPaymentError(errors[Math.floor(Math.random() * errors.length)])
    }
    
    setIsProcessing(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedMethod) {
      simulatePayment(selectedMethod)
    }
  }

  const calculateFee = (method) => {
    const selectedPaymentMethod = paymentMethods.find(m => m.id === method)
    if (!selectedPaymentMethod) return 0
    
    switch (method) {
      case 'apple-pay':
        return amount * 0.029
      case 'google-pay':
        return amount * 0.029
      case 'conekta':
        return amount * 0.029 + 3.50
      case 'mercadopago':
        return amount * 0.035
      case 'stripe':
        return amount * 0.029 + 0.30
      case 'oxxo':
        return 10
      case 'crypto':
        return amount * 0.01
      case 'bank':
        return 0
      default:
        return 0
    }
  }

  useEffect(() => {
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full my-4 sm:my-8 max-h-[95vh] overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gray-800">Métodos de Pago</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Donación: {formatMoney(amount)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Métodos de pago */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Selecciona un método</h3>
              
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 relative ${
                    selectedMethod === method.id
                      ? 'border-primary-purple bg-primary-purple/5'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => method.available && handleMethodSelect(method.id)}
                >
                  {method.popular && (
                    <div className="absolute -top-2 -right-2 bg-primary-gold text-white text-xs px-2 py-1 rounded-full font-semibold">
                      Popular
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">{method.icon}</span>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{method.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{method.description}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-10 sm:ml-0">
                      <p className="text-xs text-gray-500">Comisión: {method.fees}</p>
                      <p className="text-xs text-gray-500 hidden sm:block">{method.processingTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Formulario de pago */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Detalles de Pago</h3>
              
              {selectedMethod ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">
                        {paymentMethods.find(m => m.id === selectedMethod)?.icon}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {paymentMethods.find(m => m.id === selectedMethod)?.name}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedMethod === 'apple-pay' && (
                        <div className="text-center py-6">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-2xl mb-4">
                            <span className="text-4xl">🍎</span>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Apple Pay</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Paga de forma segura con Touch ID o Face ID
                          </p>
                          <div className="bg-gray-100 p-4 rounded-lg text-left">
                            <p className="text-xs text-gray-700 mb-2">
                              Se abrirá la ventana de Apple Pay para completar tu pago
                            </p>
                            <p className="text-xs text-gray-600">
                              Dispositivos compatibles: iPhone, iPad, Mac con Touch ID
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {selectedMethod === 'google-pay' && (
                        <div className="text-center py-6">
                          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4">
                            <span className="text-4xl">🤖</span>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">Google Pay</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Paga con tu cuenta de Google de forma segura
                          </p>
                          <div className="bg-gray-100 p-4 rounded-lg text-left">
                            <p className="text-xs text-gray-700 mb-2">
                              Se abrirá Google Pay para completar tu pago
                            </p>
                            <p className="text-xs text-gray-600">
                              Compatible con: Android, Chrome en cualquier dispositivo
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {selectedMethod !== 'crypto' && selectedMethod !== 'bank' && selectedMethod !== 'oxxo' && 
                       selectedMethod !== 'apple-pay' && selectedMethod !== 'google-pay' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Número de Tarjeta
                            </label>
                            <input
                              type="text"
                              value={paymentDetails.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal text-sm sm:text-base"
                              maxLength={19}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 sm:gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha de Expiración
                              </label>
                              <input
                                type="text"
                                value={paymentDetails.expiryDate}
                                onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal text-sm sm:text-base"
                                maxLength={5}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                value={paymentDetails.cvv}
                                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal text-sm sm:text-base"
                                maxLength={4}
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre del Titular
                            </label>
                            <input
                              type="text"
                              value={paymentDetails.cardholderName}
                              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                              placeholder="Nombre como aparece en la tarjeta"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal text-sm sm:text-base"
                              required
                            />
                          </div>
                        </>
                      )}
                      
                      {selectedMethod !== 'apple-pay' && selectedMethod !== 'google-pay' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correo Electrónico
                          </label>
                          <input
                            type="email"
                            value={paymentDetails.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="tu@email.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-purple"
                            required
                          />
                        </div>
                      )}
                      
                      {selectedMethod === 'oxxo' && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            <strong>Pago en OXXO:</strong> Se generará un código de barras que podrás 
                            presentar en cualquier tienda OXXO. El pago se reflejará en 1-24 horas.
                          </p>
                        </div>
                      )}
                      
                      {selectedMethod === 'crypto' && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            <strong>Pago con Criptomonedas:</strong> Se te proporcionará una dirección de wallet 
                            para realizar el pago. La transacción se confirmará automáticamente.
                          </p>
                        </div>
                      )}
                      
                      {selectedMethod === 'bank' && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800">
                            <strong>Transferencia Bancaria:</strong> Se te proporcionarán los datos bancarios 
                            para realizar la transferencia. El pago se confirmará en 1-3 días hábiles.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resumen del pago */}
                  <div className="bg-primary-teal/5 p-3 sm:p-4 rounded-lg border border-primary-teal/20">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Donación:</span>
                        <span className="font-medium">{formatMoney(amount)}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Comisión:</span>
                        <span className="font-medium">{formatMoney(calculateFee(selectedMethod))}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold text-sm sm:text-base">Total:</span>
                        <span className="font-bold text-primary-teal text-sm sm:text-base">
                          {formatMoney(amount + calculateFee(selectedMethod))}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-200 ${
                      isProcessing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-teal hover:bg-primary-teal/90 sm:hover:scale-105'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Procesando pago...
                      </div>
                    ) : (
                      `Pagar ${formatMoney(amount + calculateFee(selectedMethod))}`
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💳</div>
                  <p className="text-sm sm:text-base">Selecciona un método de pago para continuar</p>
                </div>
              )}
            </div>
          </div>

          {/* Información de seguridad y enlaces legales */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <span className="text-green-600 text-lg sm:text-xl flex-shrink-0">🔒</span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-green-800 text-sm sm:text-base">Pagos Seguros</h4>
                  <p className="text-xs sm:text-sm text-green-700">
                    Todos los pagos están protegidos con encriptación SSL de 256 bits.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enlaces legales */}
            <div className="text-center text-xs sm:text-sm text-gray-600">
              Al continuar con el pago, aceptas nuestros{' '}
              <a href="/terminos" target="_blank" rel="noopener noreferrer" className="text-primary-teal hover:underline font-semibold">
                Términos y Condiciones
              </a>
              {' '}y{' '}
              <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-primary-teal hover:underline font-semibold">
                Aviso de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Renderizar el modal en el body usando un portal
  return createPortal(modalContent, document.body)
}

export default PaymentMethods