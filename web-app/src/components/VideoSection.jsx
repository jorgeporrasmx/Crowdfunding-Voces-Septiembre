import { useState } from 'react'

const VideoSection = () => {
  const [videoError, setVideoError] = useState(false)

  // Video desde YouTube (Unlisted)
  const youtubeVideoId = "aU3W7i_Ex6Y"
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`
  const youtubeWatchUrl = `https://youtu.be/${youtubeVideoId}`

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
              {/* Video desde YouTube */}
              <div className="relative aspect-video bg-black">
                {videoError ? (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="text-5xl mb-4">⚠️</div>
                      <h3 className="text-xl font-bold mb-2">Video no disponible</h3>
                      <p className="text-gray-300 mb-4">
                        El video está temporalmente no disponible.
                      </p>
                      <a
                        href={youtubeWatchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        Ver en YouTube
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={youtubeEmbedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setVideoError(true)}
                    loading="lazy"
                    title="Nuestras Voces - Video Demo"
                  />
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