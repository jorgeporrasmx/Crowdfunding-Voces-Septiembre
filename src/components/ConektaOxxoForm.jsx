import { useState, useEffect } from 'react'
import conektaService from '../services/conektaService'

const ConektaOxxoForm = ({ amount, customerInfo, onSuccess, onError, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [feesInfo, setFeesInfo] = useState(null)
  const [referenceData, setReferenceData] = useState(null)

  useEffect(() => {
    // Calcular comisiones para OXXO
    const fees = conektaService.getFeesInfo(amount, 'oxxo')
    setFeesInfo(fees)
  }, [amount])

  const handleGenerateReference = async () => {
    setIsGenerating(true)

    try {
      const paymentData = {
        amount: amount,
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

      const result = await conektaService.createOxxoPayment(paymentData)

      if (result.success) {
        setReferenceData({
          transactionId: result.transactionId,
          reference: result.reference,
          barcodeUrl: result.barcode_url,
          expiresAt: result.expires_at
        })

        // No llamar onSuccess inmediatamente, esperar a que el usuario vea la referencia
      } else {
        onError(result.error)
      }
    } catch (error) {
      onError(error.message || 'Error al generar referencia OXXO')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleConfirmPayment = () => {
    onSuccess({
      method: 'Conekta - OXXO',
      transactionId: referenceData.transactionId,
      status: 'pending_payment',
      paymentInstructions: {
        reference: referenceData.reference,
        barcodeUrl: referenceData.barcodeUrl,
        expiresAt: referenceData.expiresAt,
        amount: feesInfo.amountPlusFees
      }
    })
  }

  const formatExpirationDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (referenceData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Referencia OXXO Generada</h3>
          <p className="text-gray-600">Paga en cualquier tienda OXXO de México</p>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h4 className="font-bold text-orange-800 mb-4 text-center">Instrucciones de pago</h4>
          
          {/* Código de barras */}
          {referenceData.barcodeUrl && (
            <div className="text-center mb-4">
              <img 
                src={referenceData.barcodeUrl} 
                alt="Código de barras OXXO"
                className="mx-auto max-w-full h-auto"
              />
            </div>
          )}

          {/* Referencia */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Referencia de pago:</p>
              <p className="text-2xl font-mono font-bold text-gray-800 tracking-wider">
                {referenceData.reference}
              </p>
            </div>
          </div>

          {/* Monto */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Monto a pagar:</p>
              <p className="text-2xl font-bold text-orange-600">
                ${feesInfo.amountPlusFees.toFixed(2)} MXN
              </p>
            </div>
          </div>

          {/* Instrucciones paso a paso */}
          <div className="space-y-3 text-sm text-orange-700">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <p className="font-semibold">Ve a cualquier tienda OXXO</p>
                <p>Acércate a la caja con tu referencia</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <p className="font-semibold">Proporciona la referencia</p>
                <p>Puedes mostrar el código de barras o dictar los números</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <p className="font-semibold">Realiza el pago</p>
                <p>Paga el monto exacto de ${feesInfo.amountPlusFees.toFixed(2)} MXN</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <div>
                <p className="font-semibold">Guarda tu ticket</p>
                <p>Como comprobante de pago</p>
              </div>
            </div>
          </div>

          {/* Fecha de expiración */}
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 text-center">
              <span className="font-semibold">⏰ Fecha límite de pago:</span><br />
              {formatExpirationDate(referenceData.expiresAt)}
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Información importante</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• El pago se confirmará automáticamente en 1-24 horas</li>
            <li>• Recibirás un email de confirmación una vez procesado</li>
            <li>• Guarda tu ticket como comprobante</li>
            <li>• Si tienes problemas, contacta al soporte con tu referencia</li>
          </ul>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmPayment}
            className="flex-1 py-3 px-6 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
          >
            Entendido, iré a OXXO
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🏪</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Pago en OXXO</h3>
        <p className="text-gray-600">Paga en cualquier tienda OXXO de México</p>
      </div>

      {/* Información del pago */}
      {feesInfo && (
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-3">Desglose de costos</h4>
          <div className="text-sm text-orange-700 space-y-2">
            <div className="flex justify-between">
              <span>Donación:</span>
              <span>${amount.toFixed(2)} MXN</span>
            </div>
            <div className="flex justify-between">
              <span>Comisión OXXO:</span>
              <span>${feesInfo.total.toFixed(2)} MXN</span>
            </div>
            <div className="border-t border-orange-300 pt-2 flex justify-between font-semibold">
              <span>Total a pagar en OXXO:</span>
              <span>${feesInfo.amountPlusFees.toFixed(2)} MXN</span>
            </div>
          </div>
        </div>
      )}

      {/* Ventajas de pagar en OXXO */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">¿Por qué pagar en OXXO?</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>Más de 20,000 tiendas en todo México</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>Abiertas 24 horas, todos los días</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>No necesitas tarjeta de crédito ni débito</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">✓</span>
            <span>Pago seguro y confirmación automática</span>
          </li>
        </ul>
      </div>

      {/* Proceso */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-3">¿Cómo funciona?</h4>
        <div className="text-sm text-blue-700 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>Generamos tu referencia de pago única</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>Vas a cualquier OXXO y pagas</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>Confirmamos tu donación automáticamente</span>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isGenerating}
        >
          Cancelar
        </button>
        <button
          onClick={handleGenerateReference}
          disabled={isGenerating}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generando referencia...
            </div>
          ) : (
            'Generar referencia OXXO'
          )}
        </button>
      </div>
    </div>
  )
}

export default ConektaOxxoForm