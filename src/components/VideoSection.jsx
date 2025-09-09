import { useState } from 'react'
import { MicrophoneIcon, StarIcon, PlayIcon } from './common/Icons'

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  
  // Configuración del video
  // Google Drive con parámetros optimizados
  const googleDriveId = "1YdiJeQQeakrdPsIrvN4c993Sz_NIIENE"
  const videoUrl = `https://drive.google.com/file/d/${googleDriveId}/preview?t=2s&start=2`
  
  // Opción 2: Link directo de descarga (alternativa)
  // const videoDirectUrl = `https://drive.google.com/uc?export=download&id=${googleDriveId}`
  
  // Imagen de vista previa
  const thumbnailUrl = "/video-thumbnail.jpg" // Añadir una imagen de vista previa
  
  return (
    <section id="video-section" className="py-20 bg-gradient-to-br from-primary-blue/10 to-primary-purple/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
              Conoce Nuestras Voces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un tributo a la voz humana y su poder creador. Descubre la historia, 
              los desafíos y la pasión detrás del doblaje mexicano.
            </p>
          </div>
          
          {/* Video Container */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Video Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-primary-dark">
                {!isPlaying ? (
                  <>
                    {/* Thumbnail/Poster con imagen de fondo */}
                    <div className="absolute inset-0">
                      {/* Imagen de vista previa o gradiente como fallback */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-teal to-primary-purple opacity-90" />
                      
                      {/* Overlay con contenido */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        {/* Elementos decorativos */}
                        <div className="absolute top-10 left-10 w-16 h-16 text-white/20 animate-float">
                          <MicrophoneIcon className="w-16 h-16" />
                        </div>
                        
                        <div className="absolute bottom-10 right-10 w-12 h-12 text-white/20 animate-bounce-slow">
                          <StarIcon className="w-12 h-12" />
                        </div>
                        
                        {/* Logo central */}
                        <div className="text-center z-10">
                          <img 
                            src="/logo-morado.png" 
                            alt="Nuestras Voces"
                            className="h-24 w-auto mx-auto mb-6 drop-shadow-2xl brightness-0 invert"
                          />
                          <h3 className="text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
                            Nuestras Voces
                          </h3>
                          <p className="text-white/90 text-lg drop-shadow">
                            Video Pitch Oficial • 5 minutos
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Play Button */}
                    <button 
                      className="absolute inset-0 flex items-center justify-center group"
                      onClick={() => setIsPlaying(true)}
                      aria-label="Reproducir video"
                    >
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                        <PlayIcon className="w-8 h-8 text-primary-purple ml-1" />
                      </div>
                    </button>
                  </>
                ) : videoError ? (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="text-5xl mb-4">⚠️</div>
                      <h3 className="text-xl font-bold mb-2">Video no disponible</h3>
                      <p className="text-gray-300 mb-4">
                        El video está temporalmente no disponible.
                      </p>
                      <button 
                        onClick={() => {
                          setVideoError(false)
                          setIsPlaying(false)
                        }}
                        className="btn-secondary"
                      >
                        Reintentar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    {/* Loader mientras carga */}
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-primary-teal border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p>Cargando video...</p>
                      </div>
                    </div>
                    
                    {/* Iframe del video con autoplay y inicio en segundo 2 */}
                    <iframe
                      src={videoUrl}
                      title="Video Nuestras Voces"
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={() => console.log('Video cargado')}
                      onError={() => {
                        console.log('Error cargando video')
                        setVideoError(true)
                      }}
                    />
                  </div>
                )}
              </div>
              
              {/* Video Info */}
              <div className="p-6 bg-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      El Documental del Doblaje Mexicano
                    </h4>
                    <p className="text-gray-600">
                      Una cápsula del tiempo que reconoce a generaciones de actores mexicanos 
                      que han conectado con su voz recuerdos y emociones.
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                    <button 
                      className="btn-secondary px-6 py-2"
                      onClick={() => {
                        const socialSection = document.querySelector('#social-share')
                        if (socialSection) {
                          socialSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      Compartir Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Datos del proyecto */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-3">🎬</div>
              <h4 className="font-bold text-gray-800 mb-2">80 minutos</h4>
              <p className="text-gray-600 text-sm">Duración del documental</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-3">🎭</div>
              <h4 className="font-bold text-gray-800 mb-2">11 actores</h4>
              <p className="text-gray-600 text-sm">Voces legendarias entrevistadas</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-bold text-gray-800 mb-2">Festivales 2027</h4>
              <p className="text-gray-600 text-sm">Estreno previsto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection