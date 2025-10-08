import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatMoney } from '../utils/formatMoney'
import { useAuth } from '../contexts/AuthContext'
import FirstDataRedirect from './FirstDataRedirect'
import OxxoPaymentRedirect from './OxxoPaymentRedirect'

const DonationForm = ({ onClose, initialAmount = '', reward = null }) => {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    amount: initialAmount,
    donorName: user?.displayName || '',
    email: user?.email || '',
    message: '',
    isAnonymous: false,
    acceptTerms: false,
    paymentMethod: 'fiserv' // 'fiserv' o 'oxxo'
  })

  // Actualizar datos cuando el usuario cambie
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        donorName: user.displayName || '',
        email: user.email || ''
      }))
    }
  }, [user])

  const [showPaymentMethods, setShowPaymentMethods] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Por favor ingresa un monto válido'
    } else if (parseFloat(formData.amount) < 50) {
      newErrors.amount = 'El monto mínimo es de $50 MXN'
    }

    // Solo validar nombre y email si NO hay usuario autenticado
    if (!user) {
      if (!formData.donorName.trim() && !formData.isAnonymous) {
        newErrors.donorName = 'Por favor ingresa tu nombre o marca la casilla de donación anónima'
      }

      if (!formData.email.trim()) {
        newErrors.email = 'El correo electrónico es requerido'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Por favor ingresa un correo electrónico válido'
      }
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los Términos y Condiciones y el Aviso de Privacidad'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setShowPaymentMethods(true)
    }
  }

  const handlePaymentSuccess = (result) => {
    // Determinar mensaje según método de pago
    let statusMessage = ''

    if (formData.paymentMethod === 'oxxo') {
      // Oxxo: pago pendiente
      statusMessage = 'Tu donación está pendiente de pago. Revisa tu correo para instrucciones de pago en Oxxo.'
    } else if (formData.paymentMethod === 'fiserv') {
      // Fiserv (tarjeta): pago completado
      statusMessage = '✅ Tu pago con tarjeta ha sido procesado exitosamente. ¡Gracias por tu apoyo!'
    } else {
      // Otros métodos
      statusMessage = 'Recibirás un correo con más información sobre tu donación.'
    }

    alert(
      `🎉 ¡Donación registrada!\n\n` +
      `Donante: ${formData.isAnonymous ? 'Anónimo' : formData.donorName}\n` +
      `Cantidad: ${formatMoney(parseFloat(formData.amount))}\n` +
      `Código de donante: ${result.donorCode}\n` +
      `${reward ? `\nRecompensa: ${reward.name}\n` : ''}` +
      `\n${statusMessage}\n\n` +
      `Recibirás un correo de confirmación en: ${formData.email}`
    )
    onClose && onClose()
  }

  const handlePaymentError = (error) => {
    alert(`❌ Error al registrar donación: ${error}\n\nPor favor, intenta de nuevo.`)
    setShowPaymentMethods(false)
  }

  if (showPaymentMethods) {
    const donationData = {
      donorName: formData.donorName,
      email: formData.email,
      message: formData.message,
      isAnonymous: formData.isAnonymous,
      reward: reward ? {
        id: reward.id,
        name: reward.name,
        amount: reward.amount,
        level: reward.level
      } : null
    }

    // Mostrar el componente de pago correcto según el método seleccionado
    if (formData.paymentMethod === 'oxxo') {
      return (
        <OxxoPaymentRedirect
          amount={parseFloat(formData.amount)}
          donationData={donationData}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onClose={() => setShowPaymentMethods(false)}
        />
      )
    }

    // Por defecto: Fiserv (tarjeta)
    return (
      <FirstDataRedirect
        amount={parseFloat(formData.amount)}
        donationData={donationData}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        onClose={() => setShowPaymentMethods(false)}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-800">
                {reward ? `Quiero ser parte - ${reward.name}` : '¡Quiero ser parte!'}
              </h2>
              <p className="text-gray-600 mt-1">
                {reward ? reward.name : 'Cada donación es un contrato de coproducción independiente'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Recompensa seleccionada */}
          {reward && (
            <div className="bg-primary-teal/5 border border-primary-teal/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">{reward.name}</h3>
                <span className="text-primary-teal font-bold">{formatMoney(reward.amount)}</span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Incluye:</strong>
                <ul className="mt-1 space-y-1">
                  {reward.benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-teal mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Monto de donación */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Monto de donación (MXN) *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="50"
              step="50"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa el monto (mínimo $50)"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Información personal - Solo mostrar si no está autenticado */}
          {user ? (
            <div className="bg-primary-teal/5 border border-primary-teal/20 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Donación como:</p>
              <p className="font-semibold text-gray-800">{user.displayName || 'Usuario'}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre completo {!formData.isAnonymous && '*'}
                </label>
                <input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleInputChange}
                  disabled={formData.isAnonymous}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent ${
                    formData.isAnonymous ? 'bg-gray-100' : ''
                  } ${errors.donorName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={formData.isAnonymous ? 'Donación anónima' : 'Tu nombre completo'}
                />
                {errors.donorName && <p className="text-red-500 text-sm mt-1">{errors.donorName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          )}

          {/* Mensaje opcional */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mensaje de apoyo (opcional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent"
              placeholder="Comparte por qué apoyas este proyecto..."
            />
          </div>

          {/* Selector de método de pago */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Método de pago *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Tarjeta (Fiserv) */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'fiserv' }))}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.paymentMethod === 'fiserv'
                    ? 'border-primary-teal bg-primary-teal/5'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.paymentMethod === 'fiserv'
                      ? 'border-primary-teal'
                      : 'border-gray-300'
                  }`}>
                    {formData.paymentMethod === 'fiserv' && (
                      <div className="w-3 h-3 rounded-full bg-primary-teal"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">💳 Tarjeta de Crédito/Débito</p>
                    <p className="text-xs text-gray-600">Pago inmediato y seguro</p>
                  </div>
                </div>
              </button>

              {/* Oxxo */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'oxxo' }))}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.paymentMethod === 'oxxo'
                    ? 'border-primary-teal bg-primary-teal/5'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.paymentMethod === 'oxxo'
                      ? 'border-primary-teal'
                      : 'border-gray-300'
                  }`}>
                    {formData.paymentMethod === 'oxxo' && (
                      <div className="w-3 h-3 rounded-full bg-primary-teal"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800">🏪 Oxxo</p>
                    <p className="text-xs text-gray-600">Paga en efectivo (válido 3 días)</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Opciones */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary-teal focus:ring-primary-teal border-gray-300 rounded"
              />
              <span className="text-gray-700">Hacer donación anónima</span>
            </label>
            
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className={`w-4 h-4 text-primary-teal focus:ring-primary-teal border-gray-300 rounded mt-1 ${
                  errors.acceptTerms ? 'border-red-500' : ''
                }`}
              />
              <div>
                <span className="text-gray-700">
                  He leído y acepto los{' '}
                  <a
                    href="/terminos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-teal hover:underline font-semibold"
                  >
                    Términos y Condiciones
                  </a>
                  {' '}y el{' '}
                  <a
                    href="/privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-teal hover:underline font-semibold"
                  >
                    Aviso de Privacidad
                  </a>
                  {' '}*
                </span>
                {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}
              </div>
            </label>
          </div>

          {/* Información de transparencia */}
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-bold text-yellow-800 mb-2">💡 Transparencia en costos</h4>
            <p className="text-sm text-yellow-700">
              Los procesadores de pago cobran una comisión del 1-3.5% por transacción. 
              El resto de tu donación se destina íntegramente al proyecto. 
              Puedes ver el desglose exacto en el siguiente paso.
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary-teal text-white py-3 px-6 rounded-lg hover:bg-primary-teal/90 transition-colors font-semibold"
            >
              Continuar al Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonationForm