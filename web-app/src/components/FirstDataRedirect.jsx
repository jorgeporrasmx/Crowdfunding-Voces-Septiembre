import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { formatMoney } from '../utils/formatMoney'
import donationsService from '../services/donations.service'
import firstDataService from '../services/firstdata.service'

const FirstDataRedirect = ({ amount, donationData, onSuccess, onError, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)
  const [currentDonationId, setCurrentDonationId] = useState(null)
  const [currentDonorCode, setCurrentDonorCode] = useState(null)
  const popupWindowRef = useRef(null)
  const popupCheckIntervalRef = useRef(null)
  const { user } = useAuth()

  useEffect(() => {
    setIsConfigured(firstDataService.isConfigured())
  }, [])

  // Event listener para mensajes de la ventana popup y monitoreo de cierre
  useEffect(() => {
    const ALLOWED_ORIGINS = [
      'https://test.ipg-online.com',
      'https://www2.ipg-online.com',
      window.location.origin // Permitir mensajes de nuestra propia aplicación (callback pages)
    ]

    const handleMessage = (event) => {
      console.log('📨 Mensaje recibido:', {
        origin: event.origin,
        data: event.data,
        allowedOrigins: ALLOWED_ORIGINS
      })

      // Validar origen del mensaje
      if (!ALLOWED_ORIGINS.includes(event.origin)) {
        console.warn('⚠️ Mensaje de origen no autorizado:', event.origin)
        return
      }

      console.log('✅ Mensaje recibido de origen autorizado:', event.data)

      // Procesar respuesta del pago
      try {
        const data = event.data

        // Manejar diferentes tipos de mensajes
        if (data.status === 'APPROVED' || data.approval_code) {
          // Pago exitoso - cerrar popup
          if (popupWindowRef.current && !popupWindowRef.current.closed) {
            popupWindowRef.current.close()
          }
          handlePaymentSuccess(data)
        } else if (data.status === 'DECLINED' || data.error) {
          // Pago rechazado - cerrar popup
          if (popupWindowRef.current && !popupWindowRef.current.closed) {
            popupWindowRef.current.close()
          }
          handlePaymentError(data.error || 'El pago fue rechazado')
        } else if (data.type === 'redirect') {
          // Redirección (success o fail)
          if (data.status === 'APPROVED' || (data.url && data.url.includes('donation-success'))) {
            if (popupWindowRef.current && !popupWindowRef.current.closed) {
              popupWindowRef.current.close()
            }
            handlePaymentSuccess(data)
          } else if (data.status === 'CANCELLED' || (data.url && data.url.includes('donation-cancelled'))) {
            if (popupWindowRef.current && !popupWindowRef.current.closed) {
              popupWindowRef.current.close()
            }
            handlePaymentError('Pago cancelado')
          }
        }
      } catch (error) {
        console.error('Error procesando mensaje de la ventana popup:', error)
      }
    }

    // Monitorear si el usuario cierra la ventana popup manualmente
    const checkPopupClosed = () => {
      if (popupWindowRef.current && popupWindowRef.current.closed) {
        console.log('El usuario cerró la ventana de pago')
        clearInterval(popupCheckIntervalRef.current)
        setShowPopup(false)
        setIsProcessing(false)
        // No llamamos onError aquí porque el usuario puede querer reintentar
      }
    }

    window.addEventListener('message', handleMessage)

    // Si hay un popup abierto, monitorear su estado
    if (showPopup && popupWindowRef.current) {
      popupCheckIntervalRef.current = setInterval(checkPopupClosed, 1000)
    }

    return () => {
      window.removeEventListener('message', handleMessage)
      if (popupCheckIntervalRef.current) {
        clearInterval(popupCheckIntervalRef.current)
      }
    }
  }, [currentDonationId, currentDonorCode, showPopup])

  const handlePaymentSuccess = async (data) => {
    console.log('✅ Pago exitoso recibido:', data)

    try {
      // Cerrar popup si aún está abierto
      if (popupWindowRef.current && !popupWindowRef.current.closed) {
        console.log('Cerrando popup desde ventana padre...')
        popupWindowRef.current.close()
      }

      // Cerrar el modal de "Procesando Pago" INMEDIATAMENTE
      setShowPopup(false)
      setIsProcessing(false)

      // Actualizar estado de donación en segundo plano (no bloquear UI)
      if (currentDonationId) {
        console.log('Actualizando donación a completada:', currentDonationId)
        donationsService.updateDonationStatus(
          currentDonationId,
          'completed',
          data.transaction_id || data.transactionId || null
        ).then(() => {
          console.log('✅ Donación actualizada exitosamente')
        }).catch((error) => {
          console.error('❌ Error actualizando donación (no crítico):', error)
        })
      }

      // Notificar éxito INMEDIATAMENTE (no esperar actualización)
      console.log('Notificando éxito al componente padre')
      onSuccess({
        donationId: currentDonationId,
        donorCode: currentDonorCode,
        transactionId: data.transaction_id || data.transactionId
      })
    } catch (error) {
      console.error('❌ Error en handlePaymentSuccess:', error)
      // Aún así notificar éxito porque el pago SÍ se procesó
      onSuccess({
        donationId: currentDonationId,
        donorCode: currentDonorCode,
        transactionId: data.transaction_id || data.transactionId
      })
    }
  }

  const handlePaymentError = (errorMessage) => {
    console.error('Error en pago:', errorMessage)

    // Cerrar popup si está abierto
    if (popupWindowRef.current && !popupWindowRef.current.closed) {
      popupWindowRef.current.close()
    }

    setShowPopup(false)
    setIsProcessing(false)
    onError(errorMessage)
  }

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
        userId: user?.uid || null,
        paymentMethod: 'fiserv'
      })

      if (!donationResult.success) {
        throw new Error(donationResult.error)
      }

      // Guardar IDs para uso posterior
      setCurrentDonationId(donationResult.donationId)
      setCurrentDonorCode(donationResult.donorCode)

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

        // 3. Abrir ventana popup
        const popupWidth = 800
        const popupHeight = 700
        const left = window.screen.width / 2 - popupWidth / 2
        const top = window.screen.height / 2 - popupHeight / 2

        const popupWindow = window.open(
          'about:blank',
          'fiserv-payment-window',
          `width=${popupWidth},height=${popupHeight},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        )

        if (!popupWindow) {
          throw new Error('Por favor permite las ventanas emergentes para completar el pago')
        }

        popupWindowRef.current = popupWindow
        setShowPopup(true)

        // 4. Crear formulario y enviarlo a la ventana popup
        setTimeout(() => {
          console.log('=== Fiserv Payment Debug ===')
          console.log('Payment URL:', paymentResult.paymentUrl)
          console.log('Form Params:', paymentResult.formParams)

          // Validar campos requeridos
          const requiredFields = ['storename', 'oid', 'chargetotal', 'currency', 'txntype', 'txndatetime', 'hashExtended']
          const missingFields = requiredFields.filter(field => !paymentResult.formParams[field])

          if (missingFields.length > 0) {
            console.error('❌ Campos requeridos faltantes:', missingFields)
            throw new Error(`Faltan campos requeridos: ${missingFields.join(', ')}`)
          }

          const form = document.createElement('form')
          form.method = 'POST'
          form.action = paymentResult.paymentUrl
          form.target = 'fiserv-payment-window'

          // Agregar todos los parámetros del formulario
          Object.entries(paymentResult.formParams).forEach(([key, value]) => {
            console.log(`  ${key} = ${value}`)
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = value
            form.appendChild(input)
          })

          console.log('✅ Formulario completo, enviando a Fiserv...')

          // Agregar el formulario al body y enviarlo
          document.body.appendChild(form)
          form.submit()

          // Limpiar el formulario
          document.body.removeChild(form)
        }, 100)

      } else {
        // Modo de desarrollo: sin First Data configurado
        alert(
          `✅ Donación registrada con código: ${donationResult.donorCode}\n\n` +
          `⚠️ First Data no configurado\n\n` +
          `Para completar la integración, configura las credenciales de First Data\n\n` +
          `ID de donación: ${donationResult.donationId}`
        )

        onSuccess({
          donationId: donationResult.donationId,
          donorCode: donationResult.donorCode
        })
      }

    } catch (error) {
      console.error('Error creating donation:', error)
      const errorMessage = typeof error === 'string'
        ? error
        : error?.message || error?.code || 'Error al procesar la donación'
      onError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  // Si se abrió la ventana popup de pago
  if (showPopup) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
          {/* Indicador de carga */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-teal/10 mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-teal"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Procesando Pago
            </h2>

            <p className="text-gray-600 mb-4">
              Monto: <span className="font-bold text-primary-teal">{formatMoney(amount)}</span>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>💳 Ventana de pago abierta</strong>
              </p>
              <p className="text-sm text-blue-700 mt-2">
                Completa tu pago en la ventana emergente.
                Esta ventana se cerrará automáticamente al finalizar.
              </p>
            </div>

            <button
              onClick={() => {
                if (confirm('¿Seguro que deseas cancelar el pago? La ventana de pago se cerrará.')) {
                  if (popupWindowRef.current && !popupWindowRef.current.closed) {
                    popupWindowRef.current.close()
                  }
                  setShowPopup(false)
                  onClose()
                }
              }}
              className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar Pago
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Pago seguro por Fiserv</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla inicial de confirmación
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
                <strong>🔒 Pago seguro:</strong> Completarás el pago en un formulario seguro
                de Fiserv. Tu información financiera nunca pasa por nuestros servidores.
              </>
            ) : (
              <>
                <strong>⚠️ Modo de desarrollo:</strong> Fiserv no está configurado.
                La donación quedará registrada en estado "pendiente". Configura las credenciales
                para habilitar pagos reales.
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
                {isConfigured ? 'Preparando pago seguro...' : 'Registrando donación...'}
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
