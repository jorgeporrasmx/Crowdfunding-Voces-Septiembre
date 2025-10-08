import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import donationsService from '../services/donations.service'

const DonationSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const [donation, setDonation] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const orderId = searchParams.get('orderId') || searchParams.get('order_id')
  const clientRequestId = searchParams.get('clientRequestId')

  useEffect(() => {
    // Si esta página se abrió en un popup desde el flujo de pago, notificar al padre
    if (window.opener && orderId) {
      console.log('✅ Pago exitoso - Callback de Fiserv')
      console.log('Order ID:', orderId)
      console.log('Window opener:', window.opener)
      console.log('Window origin:', window.location.origin)

      const message = {
        type: 'redirect',
        status: 'APPROVED',
        url: window.location.href,
        orderId: orderId,
        transactionId: searchParams.get('txnid') || searchParams.get('approval_code')
      }

      // Enviar mensaje a la ventana padre múltiples veces para asegurar entrega
      const sendMessage = () => {
        console.log('Enviando postMessage a ventana padre:', message)
        try {
          window.opener.postMessage(message, window.location.origin)
          console.log('✅ Mensaje enviado exitosamente')
        } catch (error) {
          console.error('❌ Error enviando mensaje:', error)
        }
      }

      // Enviar inmediatamente
      sendMessage()

      // Reintentar cada 300ms durante 2 segundos para asegurar entrega
      const interval = setInterval(sendMessage, 300)

      // Detener reintentos después de 2 segundos
      setTimeout(() => {
        clearInterval(interval)
        console.log('✅ Mensaje entregado. El usuario puede cerrar la ventana manualmente.')
      }, 2000)

      // NO cerrar automáticamente - solo manualmente
      // El usuario debe hacer click en "Cerrar Ahora"

      // Cleanup
      return () => {
        clearInterval(interval)
      }
    }

    // Cargar detalles de la donación para mostrar en la página
    if (orderId) {
      loadDonationDetails()
    }
  }, [orderId, searchParams])

  const loadDonationDetails = async () => {
    if (!orderId) {
      setLoading(false)
      return
    }

    const result = await donationsService.getDonation(orderId)
    if (result.success) {
      setDonation(result.donation)

      // Actualizar estado a completado si viene de First Data
      if (result.donation.status === 'pending') {
        await donationsService.updateDonationStatus(orderId, 'completed')
      }
    }
    setLoading(false)
  }

  // Mostrar mensaje especial si es un popup
  const isPopup = window.opener !== null

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-teal/10 to-primary-blue/10 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-teal"></div>
      </div>
    )
  }

  // Si es popup, mostrar versión simplificada con cierre automático
  if (isPopup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-teal/10 to-primary-blue/10 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          {/* Icono de éxito */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Pago Exitoso!
          </h1>

          <p className="text-gray-600 mb-6">
            Tu pago ha sido procesado correctamente.
          </p>

          {donation && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800 mb-1">
                <strong>Código de donante:</strong>
              </p>
              <p className="text-2xl font-bold text-primary-teal mb-3">
                {donation.donorCode}
              </p>
              <p className="text-sm text-green-800">
                <strong>Monto:</strong> ${donation.amount.toLocaleString('es-MX')} MXN
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              📧 Recibirás un correo de confirmación con todos los detalles.
            </p>
          </div>

          <button
            onClick={() => window.close()}
            className="w-full py-4 px-6 bg-primary-teal text-white rounded-lg hover:bg-primary-teal/90 transition-colors font-semibold text-lg"
          >
            ✓ Entendido, Cerrar Ventana
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Tu donación ha sido registrada exitosamente
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-teal/10 to-primary-blue/10 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">
              ¡Gracias por tu apoyo!
            </h1>

            <p className="text-xl text-gray-600">
              Tu donación ha sido procesada exitosamente
            </p>
          </div>

          {/* Donation Details */}
          {donation && (
            <div className="bg-gradient-to-br from-primary-teal/5 to-primary-blue/5 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Código de donante:</p>
                  <p className="text-lg font-bold text-primary-teal">{donation.donorCode}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Monto:</p>
                  <p className="text-lg font-bold text-gray-800">
                    ${donation.amount.toLocaleString('es-MX')} MXN
                  </p>
                </div>

                {donation.rewardId && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Recompensa:</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {donation.rewardName || 'Recompensa exclusiva'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-3">📧 ¿Qué sigue?</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Recibirás un correo de confirmación con los detalles de tu donación</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Tu nombre aparecerá en los créditos del documental</span>
              </li>
              {donation?.rewardId && (
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Te contactaremos para coordinar la entrega de tu recompensa</span>
                </li>
              )}
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Podrás seguir el progreso del proyecto en tiempo real</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/transparencia"
              className="block text-center py-3 px-6 border-2 border-primary-teal text-primary-teal rounded-lg hover:bg-primary-teal hover:text-white transition-all font-semibold"
            >
              Ver Transparencia
            </Link>

            <Link
              to="/"
              className="block text-center py-3 px-6 bg-primary-teal text-white rounded-lg hover:bg-primary-teal/90 transition-all font-semibold"
            >
              Volver al Inicio
            </Link>
          </div>

          {/* Social Share */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">Ayúdanos a llegar a más personas:</p>
            <div className="flex justify-center gap-4">
              <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="p-3 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationSuccessPage
