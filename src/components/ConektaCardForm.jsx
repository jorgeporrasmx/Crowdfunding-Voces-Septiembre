import { useState, useEffect } from 'react'
import conektaService from '../services/conektaService'

const ConektaCardForm = ({ amount, customerInfo, onSuccess, onError, onClose }) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [feesInfo, setFeesInfo] = useState(null)

  useEffect(() => {
    // Calcular comisiones
    const fees = conektaService.getFeesInfo(amount, 'card')
    setFeesInfo(fees)
  }, [amount])

  const handleInputChange = (field, value) => {
    let processedValue = value

    // Formatear número de tarjeta
    if (field === 'number') {
      processedValue = value
        .replace(/\D/g, '') // Solo números
        .replace(/(\d{4})(?=\d)/g, '$1 ') // Espacios cada 4 dígitos
        .slice(0, 23) // Máximo 19 dígitos + 4 espacios
    }

    // Formatear fecha de expiración
    if (field === 'exp') {
      processedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5)
      
      // Separar mes y año
      const [month, year] = processedValue.split('/')
      setCardData(prev => ({
        ...prev,
        expMonth: month || '',
        expYear: year || ''
      }))
      return
    }

    // Solo mayúsculas para nombre
    if (field === 'name') {
      processedValue = value.toUpperCase().slice(0, 50)
    }

    // Solo números para CVC
    if (field === 'cvc') {
      processedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setCardData(prev => ({
      ...prev,
      [field]: processedValue
    }))

    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const validateForm = () => {
    const validation = conektaService.validateCardData(cardData)
    setErrors(validation.errors.reduce((acc, error, index) => {
      const field = ['number', 'name', 'expMonth', 'cvc'][index] || 'general'
      acc[field] = error
      return acc
    }, {}))
    
    return validation.isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Preparar datos para el pago
      const paymentData = {
        amount: amount,
        card: {
          number: cardData.number,
          name: cardData.name,
          expYear: `20${cardData.expYear}`, // Convertir YY a YYYY
          expMonth: cardData.expMonth,
          cvc: cardData.cvc
        },
        customerInfo: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone
        },
        metadata: {
          rewardLevel: customerInfo.rewardLevel,
          message: customerInfo.message
        }
      }

      const result = await conektaService.processCardPayment(paymentData)

      if (result.success) {
        onSuccess({
          method: 'Conekta - Tarjeta',
          transactionId: result.transactionId,
          status: result.status,
          data: result.data
        })
      } else {
        onError(result.error)
      }
    } catch (error) {
      onError(error.message || 'Error al procesar el pago')
    } finally {
      setIsProcessing(false)
    }
  }

  const getCardType = (number) => {
    const cleaned = number.replace(/\s/g, '')
    if (/^4/.test(cleaned)) return { type: 'visa', icon: '💳' }
    if (/^5[1-5]|^2[2-7]/.test(cleaned)) return { type: 'mastercard', icon: '💳' }
    if (/^3[47]/.test(cleaned)) return { type: 'amex', icon: '💳' }
    return { type: 'unknown', icon: '💳' }
  }

  const cardType = getCardType(cardData.number)

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Pago con Tarjeta</h3>
        <p className="text-sm text-gray-600">Procesado por Conekta - Pagos seguros</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Número de tarjeta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de tarjeta *
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardData.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal ${
                errors.number ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength="23"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl">
              {cardType.icon}
            </div>
          </div>
          {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
        </div>

        {/* Nombre del titular */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del titular *
          </label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="JUAN PÉREZ"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Fecha y CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiración *
            </label>
            <input
              type="text"
              value={`${cardData.expMonth}${cardData.expYear ? '/' + cardData.expYear : ''}`}
              onChange={(e) => handleInputChange('exp', e.target.value)}
              placeholder="MM/YY"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal ${
                errors.expMonth ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength="5"
            />
            {errors.expMonth && <p className="text-red-500 text-sm mt-1">{errors.expMonth}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVC *
            </label>
            <input
              type="text"
              value={cardData.cvc}
              onChange={(e) => handleInputChange('cvc', e.target.value)}
              placeholder="123"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal ${
                errors.cvc ? 'border-red-500' : 'border-gray-300'
              }`}
              maxLength="4"
            />
            {errors.cvc && <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>}
          </div>
        </div>

        {/* Información de comisiones */}
        {feesInfo && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Desglose de costos</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div className="flex justify-between">
                <span>Donación:</span>
                <span>${amount.toFixed(2)} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Comisión Conekta:</span>
                <span>${feesInfo.total.toFixed(2)} MXN</span>
              </div>
              <div className="border-t pt-1 flex justify-between font-semibold">
                <span>Total a pagar:</span>
                <span>${feesInfo.amountPlusFees.toFixed(2)} MXN</span>
              </div>
            </div>
          </div>
        )}

        {/* Información de seguridad */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-start space-x-2">
            <span className="text-green-600 text-lg">🔒</span>
            <div>
              <h4 className="font-semibold text-green-800">Pago seguro con Conekta</h4>
              <p className="text-sm text-green-700">
                Tu información está protegida con encriptación de nivel bancario. 
                Conekta cumple con estándares PCI DSS.
              </p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-teal hover:bg-primary-teal/90'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Procesando...
              </div>
            ) : (
              `Pagar $${feesInfo?.amountPlusFees.toFixed(2) || amount.toFixed(2)} MXN`
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConektaCardForm