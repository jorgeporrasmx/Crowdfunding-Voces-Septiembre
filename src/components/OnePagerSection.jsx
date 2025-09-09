import { useState } from 'react'

const OnePagerSection = () => {
  const [showFullImage, setShowFullImage] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section id="one-pager" className="py-20 bg-gradient-to-r from-primary-purple/5 to-primary-violet/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              One Page del proyecto
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descarga nuestro One Pager completo con todos los detalles del proyecto,
              presupuesto, timeline y objetivos del documental.
            </p>
          </div>

          {/* One Pager Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Preview de la imagen */}
              <div 
                className="relative cursor-pointer group overflow-hidden"
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                onClick={() => setShowFullImage(true)}
              >
                <img
                  src="/one-pager.png"
                  alt="Nuestras Voces - One Pager"
                  className={`w-full object-cover object-top transition-all duration-700 ease-in-out ${
                    isExpanded ? 'h-auto max-h-[800px]' : 'h-48 md:h-56'
                  }`}
                  loading="lazy"
                />
                
                {/* Máscara de gradiente para indicar más contenido */}
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                )}
                
                {/* Overlay para indicar que se puede hacer clic */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                {/* Indicador de hover */}
                <div className="absolute top-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {!isExpanded && (
                    <div className="bg-primary-purple/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Hover para ver completo
                    </div>
                  )}
                  <div className="bg-white/90 rounded-full p-2">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Información y botón de descarga */}
              <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      One Pager - Nuestras Voces
                    </h3>
                    <p className="text-gray-600">
                      Documento completo con toda la información del proyecto documental.
                      Incluye objetivos, presupuesto, timeline y detalles de producción.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <a
                      href="/nuestras-voces-one-pager.pdf"
                      download="Nuestras_Voces_One_Pager.pdf"
                      className="btn-primary inline-flex items-center px-6 py-3"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Descargar PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas del proyecto */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-3">🎬</div>
              <h4 className="font-bold text-gray-800 mb-2">11 Entrevistas</h4>
              <p className="text-gray-600 text-sm">Actores de doblaje legendarios</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-3">⏱️</div>
              <h4 className="font-bold text-gray-800 mb-2">80 Minutos</h4>
              <p className="text-gray-600 text-sm">Duración del documental final</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-gray-800 mb-2">$2,000,000</h4>
              <p className="text-gray-600 text-sm">Meta de financiamiento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para ver imagen completa */}
      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-4xl w-full max-h-full overflow-auto">
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src="/one-pager.png"
              alt="Nuestras Voces - One Pager Completo"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default OnePagerSection