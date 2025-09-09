import { useState } from 'react'
import { StarIcon, MicrophoneIcon, ArrowDownIcon } from './common/Icons'
import DonationButton from './DonationButton'

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fondo con patrón de puntos */}
      <div className="absolute inset-0 dots-pattern opacity-10"></div>
      
      {/* Gradiente radial de fondo */}
      <div className="absolute inset-0 radial-gradient from-primary-teal/20 via-transparent to-primary-orange/20"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-20 h-20 text-primary-orange/30 animate-float">
        <StarIcon className="w-20 h-20" />
      </div>
      
      <div className="absolute top-40 right-20 w-16 h-16 text-primary-blue/30 animate-bounce-slow">
        <MicrophoneIcon className="w-16 h-16" />
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
            <span className="text-gradient">Nuestras Voces</span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            El Documental del Doblaje Mexicano
          </p>
          
          {/* Descripción */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Un tributo a las voces que dieron vida a nuestros personajes favoritos. 
            Celebramos el arte del doblaje mexicano y su impacto cultural.
          </p>
          
          {/* Video Pitch */}
          <div className="mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative pb-[56.25%]">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                    {!isPlaying ? (
                      <div className="text-center">
                        <button
                          onClick={() => setIsPlaying(true)}
                          className="group relative"
                          aria-label="Reproducir video pitch"
                        >
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-primary-orange rounded-full flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-orange/90">
                            <svg
                              className="w-8 h-8 md:w-10 md:h-10 text-white ml-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                          <div className="absolute inset-0 rounded-full bg-primary-orange opacity-30 animate-ping"></div>
                        </button>
                        
                        <div className="mt-6 text-white">
                          <h3 className="text-xl md:text-2xl font-bold mb-2">
                            Video Pitch del Proyecto
                          </h3>
                          <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto">
                            Conoce la visión completa del equipo creativo
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="w-16 h-16 border-4 border-primary-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p>El video estará disponible próximamente...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mensaje principal */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 border-l-4 border-primary-teal shadow-lg">
            <p className="text-2xl font-bold text-gray-800">
              "Cada peso cuenta para llevar el doblaje mexicano a la pantalla."
            </p>
            <p className="text-lg text-gray-600 mt-2">
              ¡No hay mínimo ni límite! La campaña permanece abierta indefinidamente.
            </p>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <DonationButton 
              className="btn-primary text-xl px-8 py-4 animate-pulse-ring"
            >
              🎬 Apoyar Nuestras Voces
            </DonationButton>
            <button 
              className="btn-secondary text-xl px-8 py-4"
              onClick={() => {
                const rewardsSection = document.getElementById('recompensas')
                if (rewardsSection) {
                  rewardsSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              🎁 Ver Recompensas
            </button>
          </div>
          
          {/* Stats destacados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-primary-teal">$5M</div>
              <div className="text-sm text-gray-600">Meta MXN</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-primary-orange">11</div>
              <div className="text-sm text-gray-600">Niveles de Recompensas</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-3xl font-bold text-primary-blue">∞</div>
              <div className="text-sm text-gray-600">Tiempo Límite</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDownIcon className="w-6 h-6 text-primary-teal" />
      </div>
    </section>
  )
}

export default HeroSection