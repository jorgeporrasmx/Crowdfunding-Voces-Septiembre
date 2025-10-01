import { useState } from 'react'
import { formatMoney } from '../utils/formatMoney'
import donationsService from '../services/donations.service'

const FirstDataRedirect = ({ amount, donationData, onSuccess, onError, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProceedToPayment = async () => {
    setIsProcessing(true)

    try {
      // Crear donación en Firebase Firestore
      const result = await donationsService.createDonation({
        amount: amount,
        donorName: donationData.donorName,
        donorEmail: donationData.email,
        message: donationData.message,
        isAnonymous: donationData.isAnonymous,
        rewardId: donationData.reward?.id || null,
        userId: null // TODO: Agregar cuando haya autenticación
      })

      if (!result.success) {
        throw new Error(result.error)
      }

      alert(
        `✅ Donación registrada con código: ${result.donorCode}\n\n` +
        `🚧 Próximamente: Redirección a First Data para completar pago\n\n` +
        `💡 Por ahora, la donación queda en estado "pendiente"\n\n` +
        `ID de donación: ${result.donationId}`
      )

      onSuccess({
        donationId: result.donationId,
        donorCode: result.donorCode
      })

    } catch (error) {
      console.error('Error creating donation:', error)
      onError(error.message || 'Error al procesar la donación')
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

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>🚧 En desarrollo:</strong> Próximamente serás redirigido a First Data
            para completar el pago de forma segura. Por ahora, las donaciones quedan
            registradas en estado "pendiente".
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
                Procesando...
              </div>
            ) : (
              'Registrar Donación (Pendiente Pago)'
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
