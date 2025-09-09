import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { formatMoney } from '../utils/formatMoney'
import ConektaCardForm from './ConektaCardForm'
import ConektaOxxoForm from './ConektaOxxoForm'
import conektaService from '../services/conektaService'

const PaymentMethodsV2 = ({ amount, onPaymentSuccess, onPaymentError, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [customerInfoErrors, setCustomerInfoErrors] = useState({})

  useEffect(() => {
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const paymentMethods = [
    {
      id: 'conekta-card',
      name: 'Tarjeta de Crédito/Débito',
      icon: '💳',
      description: 'Visa, Mastercard, American Express (México)',
      processingTime: 'Inmediato',
      fees: '2.9% + $3.50',
      available: true,
      provider: 'conekta'
    },
    {
      id: 'conekta-oxxo',
      name: 'OXXO Pay',
      icon: '🏪',
      description: 'Pago en efectivo en +20,000 tiendas OXXO',
      processingTime: '1-24 horas',
      fees: '$10 MXN',
      available: true,
      provider: 'conekta'
    },
    {
      id: 'bank-transfer',
      name: 'Transferencia Bancaria',
      icon: '🏦',
      description: 'SPEI - Transferencia bancaria inmediata',
      processingTime: 'Inmediato',
      fees: '$8 MXN',
      available: false, // Será habilitado próximamente
      provider: 'conekta'
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      icon: '🛒',
      description: 'Próximamente disponible',
      processingTime: '24-48 horas',
      fees: '3.5%',
      available: false
    },
    {
      id: 'crypto',
      name: 'Criptomonedas',
      icon: '₿',
      description: 'Próximamente disponible',
      processingTime: '10-30 minutos',
      fees: '1%',
      available: false
    }
  ]

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId)
    setShowPaymentForm(false)
  }

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (customerInfoErrors[field]) {
      setCustomerInfoErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validateCustomerInfo = () => {
    const errors = {}
    
    if (!customerInfo.name.trim()) {
      errors.name = 'El nombre es requerido'
    }
    
    if (!customerInfo.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = 'Email inválido'
    }
    
    setCustomerInfoErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleProceedToPayment = () => {
    if (validateCustomerInfo()) {
      setShowPaymentForm(true)
    }
  }

  const handlePaymentSuccess = (result) => {
    onPaymentSuccess(result.method, result.transactionId)
  }

  const handlePaymentError = (error) => {
    onPaymentError(error)
  }

  const handleBackToMethods = () => {
    setShowPaymentForm(false)
    setSelectedMethod('')
  }

  const calculateFee = (methodId) => {
    if (methodId?.startsWith('conekta-')) {
      const paymentType = methodId.replace('conekta-', '')
      const fees = conektaService.getFeesInfo(amount, paymentType === 'card' ? 'card' : paymentType === 'oxxo' ? 'oxxo' : 'spei')
      return fees.total
    }
    return 0
  }

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
                  className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedMethod === method.id
                      ? 'border-primary-teal bg-primary-teal/5'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => method.available && handleMethodSelect(method.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">{method.icon}</span>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{method.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{method.description}</p>
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
              
              {showPaymentForm ? (
                <div>
                  {/* Mostrar el componente de pago específico */}
                  {selectedMethod === 'conekta-card' && (
                    <ConektaCardForm
                      amount={amount}
                      customerInfo={customerInfo}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      onClose={handleBackToMethods}
                    />
                  )}
                  
                  {selectedMethod === 'conekta-oxxo' && (
                    <ConektaOxxoForm
                      amount={amount}
                      customerInfo={customerInfo}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      onClose={handleBackToMethods}
                    />
                  )}
                  
                  {selectedMethod === 'bank-transfer' && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🏦</div>
                      <p className="text-gray-600">SPEI estará disponible próximamente</p>
                      <button
                        onClick={handleBackToMethods}
                        className="mt-4 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Volver a métodos de pago
                      </button>
                    </div>
                  )}
                </div>
              ) : selectedMethod ? (
                <div className="space-y-4">
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                          placeholder="Tu nombre completo"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal text-sm sm:text-base ${
                            customerInfoErrors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {customerInfoErrors.name && (
                          <p className="text-red-500 text-sm mt-1">{customerInfoErrors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                          placeholder="tu@email.com"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal text-sm sm:text-base ${
                            customerInfoErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          required
                        />
                        {customerInfoErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{customerInfoErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono (opcional)
                        </label>
                        <input
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                          placeholder="55 1234 5678"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal text-sm sm:text-base"
                        />
                      </div>
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
                    type="button"
                    onClick={handleProceedToPayment}
                    className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-200 bg-primary-teal hover:bg-primary-teal/90 sm:hover:scale-105"
                  >
                    Continuar con {paymentMethods.find(m => m.id === selectedMethod)?.name}
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💳</div>
                  <p className="text-sm sm:text-base">Selecciona un método de pago para continuar</p>
                </div>
              )}
            </div>
          </div>

          {/* Información de seguridad y enlaces legales */}
          <div className="space-y-3 sm:space-y-4 mt-6">
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <span className="text-green-600 text-lg sm:text-xl flex-shrink-0">🔒</span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-green-800 text-sm sm:text-base">Pagos Seguros con Conekta</h4>
                  <p className="text-xs sm:text-sm text-green-700">
                    Todos los pagos están protegidos con encriptación SSL de 256 bits y cumplen con estándares PCI DSS.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enlaces legales */}
            <div className="text-center text-xs sm:text-sm text-gray-600">
              Al continuar con el pago, aceptas nuestros{' '}
              <a href="/terminos" target="_blank" className="text-primary-teal hover:underline font-semibold">
                Términos y Condiciones
              </a>
              {' '}y{' '}
              <a href="/privacidad" target="_blank" className="text-primary-teal hover:underline font-semibold">
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

export default PaymentMethodsV2