import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { formatMoney } from '../utils/formatMoney'
import donationsService from '../services/donations.service'
import oxxoService from '../services/oxxo.service'

const OxxoPaymentRedirect = ({ amount, donationData, onSuccess, onError, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [oxxoVoucher, setOxxoVoucher] = useState(null)
  const { user } = useAuth()

  const handleGenerateOxxoVoucher = async () => {
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
        userId: user?.uid || null,
        paymentMethod: 'oxxo'
      })

      if (!donationResult.success) {
        throw new Error(donationResult.error)
      }

      // 2. Generar voucher de Oxxo
      const oxxoResult = await oxxoService.createOxxoPayment({
        amount: amount,
        orderId: donationResult.donationId,
        customerInfo: {
          name: donationData.donorName,
          email: donationData.email,
          phone: user?.phoneNumber || '+5215555555555'
        },
        metadata: {
          donationId: donationResult.donationId,
          donorCode: donationResult.donorCode,
          userName: donationData.donorName,
          userEmail: donationData.email
        }
      })

      if (!oxxoResult.success) {
        throw new Error(oxxoResult.error)
      }

      // 3. Actualizar donación con información de Oxxo
      await donationsService.updateDonationStatus(
        donationResult.donationId,
        'pending_oxxo',
        null,
        {
          oxxoReference: oxxoResult.oxxoReference,
          oxxoBarcodeUrl: oxxoResult.oxxoBarcodeUrl,
          expiresAt: oxxoResult.expiresAt
        }
      )

      // 4. Mostrar voucher
      setOxxoVoucher({
        ...oxxoResult,
        donationId: donationResult.donationId,
        donorCode: donationResult.donorCode
      })

    } catch (error) {
      console.error('Error creating Oxxo voucher:', error)
      const errorMessage = typeof error === 'string'
        ? error
        : error?.message || error?.code || 'Error al generar el voucher de Oxxo'
      onError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadVoucher = () => {
    if (oxxoVoucher?.oxxoBarcodeUrl) {
      window.open(oxxoVoucher.oxxoBarcodeUrl, '_blank')
    }
  }

  const handleCopyReference = () => {
    if (oxxoVoucher?.oxxoReference) {
      navigator.clipboard.writeText(oxxoVoucher.oxxoReference)
      alert('Referencia copiada al portapapeles')
    }
  }

  // Si ya se generó el voucher, mostrar la información
  if (oxxoVoucher) {
    const expiresDate = new Date(oxxoVoucher.expiresAt)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">
              ¡Voucher Generado!
            </h2>
            <p className="text-gray-600">
              Tu donación está registrada. Completa el pago en Oxxo para activarla.
            </p>
          </div>

          {/* Código de barras */}
          {oxxoVoucher.oxxoBarcodeUrl && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
              <img
                src={oxxoVoucher.oxxoBarcodeUrl}
                alt="Código de barras Oxxo"
                className="mx-auto mb-4 max-w-full"
              />
              <p className="text-sm text-gray-600 mb-2">Referencia de pago:</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-bold text-primary-teal font-mono">
                  {oxxoVoucher.oxxoReference}
                </p>
                <button
                  onClick={handleCopyReference}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copiar referencia"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Información de pago */}
          <div className="bg-primary-teal/10 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Monto a pagar:</h3>
            <p className="text-4xl font-bold text-primary-teal mb-4">{formatMoney(amount)}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Código de donante:</p>
                <p className="font-semibold text-gray-800">{oxxoVoucher.donorCode}</p>
              </div>
              <div>
                <p className="text-gray-600">Vence el:</p>
                <p className="font-semibold text-gray-800">
                  {expiresDate.toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-blue-900 mb-3">📋 Cómo pagar en Oxxo:</h3>
            <ol className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>Descarga o imprime el voucher con el botón de abajo</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>Acude a cualquier tienda Oxxo</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>Presenta el voucher o proporciona la referencia al cajero</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <span>Realiza el pago en efectivo</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">5.</span>
                <span>Recibirás un correo de confirmación en 24-48 horas</span>
              </li>
            </ol>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadVoucher}
              className="w-full py-3 px-6 bg-primary-teal text-white rounded-lg hover:bg-primary-teal/90 transition-colors font-semibold"
            >
              📥 Descargar Voucher
            </button>

            <button
              onClick={() => {
                onSuccess({
                  donationId: oxxoVoucher.donationId,
                  donorCode: oxxoVoucher.donorCode
                })
              }}
              className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Entendido
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            * El voucher es válido por 3 días. Guárdalo para realizar tu pago.
          </p>
        </div>
      </div>
    )
  }

  // Pantalla inicial de confirmación
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
            <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pago en Oxxo
          </h2>
          <p className="text-gray-600">
            Genera tu voucher para pagar en efectivo
          </p>
        </div>

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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>💡 Importante:</strong> Se generará un voucher con un código de barras
            que podrás pagar en cualquier Oxxo. El voucher es válido por 3 días.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGenerateOxxoVoucher}
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
                Generando Voucher...
              </div>
            ) : (
              'Generar Voucher de Oxxo'
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
          * No se realizará ningún cargo hasta que pagues en Oxxo
        </p>
      </div>
    </div>
  )
}

export default OxxoPaymentRedirect
