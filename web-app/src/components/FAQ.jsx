import { useState } from 'react'
import { ChevronDownIcon, EmailIcon, WhatsAppIcon } from './common/Icons'

const FAQ = () => {
  const [openItem, setOpenItem] = useState(0)
  
  const faqs = [
    {
      question: "¿Qué es el modelo 'keep-it-all'?",
      answer: "A diferencia de otras plataformas, no hay un mínimo requerido para que recibamos los fondos. Cada peso donado va directamente al proyecto, sin importar si alcanzamos la meta sugerida de 5 millones de pesos. La campaña permanece abierta indefinidamente."
    },
    {
      question: "¿Cómo se entregan las recompensas?",
      answer: "Las recompensas digitales se envían por correo electrónico dentro de 48 horas. Las recompensas físicas se entregan una vez completada la producción (estimado: 2027). Las experiencias VIP se coordinan directamente con cada donante según disponibilidad."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos tarjetas de crédito/débito, transferencias bancarias, pagos en efectivo (Oxxo, 7-Eleven), PayPal para donantes internacionales, y criptomonedas (Bitcoin, Ethereum). Los costos de transacción (3-5%) se muestran de forma transparente."
    },
    {
      question: "¿Puedo cambiar mi nivel de recompensa después de ser parte?",
      answer: "Sí, puedes actualizar tu donación a un nivel superior en cualquier momento. Contáctanos a hola@sutilde.com y te ayudaremos con el proceso. No es posible reducir el monto una vez procesado el pago."
    },
    {
      question: "¿Las donaciones son deducibles de impuestos?",
      answer: "Las donaciones se manejan como contratos de coproducción independientes, no como donaciones deducibles. Cada donante recibe un contrato digital que especifica que su aporte es una inversión en coproducción con recompensas específicas."
    },
    {
      question: "¿Cómo garantizan la transparencia en el uso de fondos?",
      answer: "Publicamos actualizaciones semanales con el desglose exacto de gastos, fotos del rodaje, y avances del proyecto. Los donantes tienen acceso a un área exclusiva con contenido adicional y reportes detallados. Sin comisiones de plataforma ocultas."
    },
    {
      question: "¿Qué pasa si no se completa el documental?",
      answer: "Tenemos un plan de producción sólido y experiencia previa (documental 'El Gran Salto'). En el caso extremadamente improbable de no poder completar el proyecto, todos los donantes recibirían el material grabado disponible y un reporte detallado del uso de fondos."
    },
    {
      question: "¿Puedo ser parte desde el extranjero?",
      answer: "¡Por supuesto! Aceptamos donantes internacionales a través de PayPal y Stripe. Las recompensas digitales se entregan normalmente, y coordinamos envíos internacionales para recompensas físicas (costos adicionales pueden aplicar)."
    },
    {
      question: "¿Cuándo se estrena el documental?",
      answer: "El estreno está programado para festivales en mayo 2027 y cines nacionales en noviembre 2027. Los donantes de niveles superiores tendrán acceso prioritario a premieres y eventos especiales."
    },
    {
      question: "¿Cómo puedo seguir el progreso del proyecto?",
      answer: "Sigue nuestras redes sociales, suscríbete a nuestro newsletter, y revisa el dashboard de transparencia en tiempo real. Los donantes reciben actualizaciones exclusivas por correo cada semana."
    }
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Resolvemos todas tus dudas sobre "Nuestras Voces"
            </p>
          </div>
          
          {/* Accordion de preguntas */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenItem(openItem === index ? -1 : index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`transform transition-transform duration-200 ${openItem === index ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon className="w-5 h-5 text-primary-teal" />
                  </div>
                </button>
                
                {openItem === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Soporte adicional */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary-teal/10 to-primary-blue/10 rounded-2xl p-8 border border-primary-teal/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ¿Necesitas más ayuda?
              </h3>
              <p className="text-gray-600 mb-6">
                Nuestro equipo está disponible para resolver cualquier duda específica
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:hola@sutilde.com"
                  className="btn-primary px-6 py-3 inline-flex items-center"
                >
                  <EmailIcon className="w-5 h-5 mr-2" />
                  Escribir por Email
                </a>
                
                <a 
                  href="https://wa.me/5216144273301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-6 py-3 inline-flex items-center"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <p>📞 +52 614 427 3301 • 📧 hola@sutilde.com</p>
                <p className="mt-2">Horario de atención: Lunes a Viernes, 9:00 - 18:00 hrs (GMT-6)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ