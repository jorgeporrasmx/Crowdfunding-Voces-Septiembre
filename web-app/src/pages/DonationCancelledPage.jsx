import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const DonationCancelledPage = () => {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // Si esta página se abrió en un popup desde el flujo de pago, notificar al padre
    if (window.opener) {
      const orderId = searchParams.get('orderId') || searchParams.get('order_id')

      console.log('❌ Pago cancelado - Callback de Fiserv')
      console.log('Order ID:', orderId)
      console.log('Enviando mensaje a ventana padre...')

      const message = {
        type: 'redirect',
        status: 'CANCELLED',
        url: window.location.href,
        orderId: orderId
      }

      // Enviar mensaje múltiples veces para asegurar entrega
      const sendMessage = () => {
        try {
          window.opener.postMessage(message, window.location.origin)
          console.log('✅ Mensaje de cancelación enviado')
        } catch (error) {
          console.error('❌ Error enviando mensaje:', error)
        }
      }

      // Enviar inmediatamente
      sendMessage()

      // Reintentar cada 300ms durante 2 segundos
      const interval = setInterval(sendMessage, 300)

      setTimeout(() => {
        clearInterval(interval)
        console.log('✅ Mensaje entregado. El usuario puede cerrar la ventana.')
      }, 2000)

      // NO cerrar automáticamente
      return () => clearInterval(interval)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-4">
              <svg
                className="w-12 h-12 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">
              Donación Cancelada
            </h1>

            <p className="text-xl text-gray-600">
              Has cancelado el proceso de pago
            </p>
          </div>

          {/* Info */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <p className="text-orange-800">
              No te preocupes, no se ha realizado ningún cargo. Puedes intentar de nuevo
              cuando estés listo para apoyar el proyecto.
            </p>
          </div>

          {/* Why Support */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              ¿Por qué apoyar "Nuestras Voces"?
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-teal mr-2 mt-1">✓</span>
                <span>Preservamos la historia del doblaje mexicano</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-teal mr-2 mt-1">✓</span>
                <span>100% de transparencia en el uso de fondos</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-teal mr-2 mt-1">✓</span>
                <span>Recompensas exclusivas para cada nivel de apoyo</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-teal mr-2 mt-1">✓</span>
                <span>Tu nombre en los créditos del documental</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/#recompensas"
              className="block text-center py-3 px-6 border-2 border-primary-teal text-primary-teal rounded-lg hover:bg-primary-teal hover:text-white transition-all font-semibold"
            >
              Ver Recompensas
            </Link>

            <Link
              to="/"
              className="block text-center py-3 px-6 bg-primary-teal text-white rounded-lg hover:bg-primary-teal/90 transition-all font-semibold"
            >
              Volver al Inicio
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              ¿Tienes dudas?{' '}
              <Link to="/#faq" className="text-primary-teal hover:underline font-semibold">
                Consulta nuestras preguntas frecuentes
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationCancelledPage
