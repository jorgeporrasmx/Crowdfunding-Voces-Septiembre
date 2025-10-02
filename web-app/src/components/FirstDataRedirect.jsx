import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { formatMoney } from '../utils/formatMoney'
import donationsService from '../services/donations.service'
import firstDataService from '../services/firstdata.service'

const FirstDataRedirect = ({ amount, donationData, onSuccess, onError, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setIsConfigured(firstDataService.isConfigured())
  }, [])

  const handleProceedToPayment = async () => {
    setIsProcessing(true)

    try {
      // 1. Crear donación en Firebase Firestore
      const donationResult = await donationsService.createDonation({
        amount: amount,
        donorName: donationData.donorName,
        donorEmail: donationData.email,
        message: donationData.message,
        isAnonymous: donationData.isAnonymous,
        rewardId: donationData.reward?.id || null,
        userId: user?.uid || null
      })

      if (!donationResult.success) {
        throw new Error(donationResult.error)
      }

      // 2. Si First Data está configurado, generar Payment URL
      if (isConfigured) {
        const paymentResult = await firstDataService.createPaymentUrl({
          amount: amount,
          currency: 'MXN',
          orderId: donationResult.donationId,
          description: `Donación para Nuestras Voces - ${donationResult.donorCode}`,
          metadata: {
            donationId: donationResult.donationId,
            donorCode: donationResult.donorCode,
            userName: donationData.donorName,
            userEmail: donationData.email
          }
        })

        if (!paymentResult.success) {
          throw new Error(paymentResult.error)
        }

        // 3. Redirigir al usuario al Payment URL de First Data
        window.location.href = paymentResult.paymentUrl

      } else {
        // Modo de desarrollo: sin First Data configurado
        alert(
          `✅ Donación registrada con código: ${donationResult.donorCode}\n\n` +
          `⚠️ First Data no configurado\n\n` +
          `Para completar la integración, configura las credenciales de First Data en .env.local\n\n` +
          `ID de donación: ${donationResult.donationId}`
        )

        onSuccess({
          donationId: donationResult.donationId,
          donorCode: donationResult.donorCode
        })
      }

    } catch (error) {
      console.error('Error creating donation:', error)
      // Extraer solo el mensaje del error, evitando objetos circulares
      const errorMessage = typeof error === 'string'
        ? error
        : error?.message || error?.code || 'Error al procesar la donación'
      onError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Confirmar Donación
        </h2>

        <div className="bg-primary-teal/10 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Monto a donar:</p>
            <p className="text-4xl font-bold text-primary-teal">
              {formatMoney(amount)}
            </p>
          </div>
        </div>

        {donationData.reward && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Recompensa seleccionada:</p>
            <p className="font-semibold text-gray-800">{donationData.reward.name}</p>
          </div>
        )}

        <div className={`border rounded-lg p-4 mb-6 ${
          isConfigured
            ? 'bg-blue-50 border-blue-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <p className={`text-sm ${isConfigured ? 'text-blue-800' : 'text-yellow-800'}`}>
            {isConfigured ? (
              <>
                <strong>🔒 Pago seguro:</strong> Serás redirigido a First Data para completar
                el pago de forma segura. Tu información financiera nunca pasa por nuestros servidores.
              </>
            ) : (
              <>
                <strong>⚠️ Modo de desarrollo:</strong> First Data no está configurado.
                La donación quedará registrada en estado "pendiente". Configura las credenciales
                en .env.local para habilitar pagos reales.
              </>
            )}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleProceedToPayment}
            disabled={isProcessing}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-teal hover:bg-primary-teal/90'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isConfigured ? 'Redirigiendo a First Data...' : 'Registrando donación...'}
              </div>
            ) : (
              isConfigured ? 'Proceder al Pago Seguro' : 'Registrar Donación (Sin Pago)'
            )}
          </button>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          * Recibirás un correo con tu código de donante una vez que se complete el pago
        </p>
      </div>
    </div>
  )
}

export default FirstDataRedirect
