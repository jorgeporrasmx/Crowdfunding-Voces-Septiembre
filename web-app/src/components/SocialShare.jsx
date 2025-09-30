import { useState } from 'react'

const SocialShare = () => {
  const [copied, setCopied] = useState(false)
  
  const shareUrl = 'https://nuestrasvoces.com'
  const shareText = '¡Apoyo Nuestras Voces, la película del doblaje mexicano! Únete en'
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'Twitter/X',
      icon: '🐦',
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Instagram',
      icon: '📸',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      url: 'https://www.instagram.com/',
      note: 'Comparte en Stories'
    },
    {
      name: 'TikTok',
      icon: '🎵',
      color: 'bg-black hover:bg-gray-800',
      url: 'https://www.tiktok.com/upload',
      note: 'Crea tu propio video'
    }
  ]

  return (
    <section id="social-share" className="py-20 bg-gradient-to-br from-primary-orange/10 to-primary-red/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título */}
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            Comparte Nuestras Voces
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ayúdanos a llegar a más personas que aman el doblaje mexicano. 
            ¡Cada compartida cuenta!
          </p>
          
          {/* Mensaje predefinido */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">📝 Mensaje sugerido:</h3>
            <div className="bg-gray-100 rounded-lg p-4 border-l-4 border-primary-teal">
              <p className="text-gray-800 italic">
                "{shareText} {shareUrl}"
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">Personaliza este mensaje como gustes</span>
              <button 
                onClick={handleCopyLink}
                className="text-primary-teal hover:text-primary-teal/80 font-semibold text-sm"
              >
                {copied ? '✅ Copiado' : '📋 Copiar enlace'}
              </button>
            </div>
          </div>
          
          {/* Botones de redes sociales */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {shareLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 block`}
              >
                <div className="text-3xl mb-2">{social.icon}</div>
                <div className="font-semibold">{social.name}</div>
                {social.note && (
                  <div className="text-xs opacity-90 mt-1">{social.note}</div>
                )}
              </a>
            ))}
          </div>
          
          {/* Kit de prensa */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <span className="text-primary-purple mr-3">📦</span>
              Kit de Prensa Digital
            </h3>
            
            <p className="text-gray-600 mb-6">
              Descarga recursos oficiales para compartir en tus redes sociales y blog
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-primary-teal/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🎬</div>
                <h4 className="font-semibold text-gray-800">Tráiler HD</h4>
                <p className="text-sm text-gray-600">Video promocional 2 min</p>
              </div>
              
              <div className="bg-primary-orange/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🖼️</div>
                <h4 className="font-semibold text-gray-800">Imágenes</h4>
                <p className="text-sm text-gray-600">Posters y screenshots</p>
              </div>
              
              <div className="bg-primary-blue/10 rounded-lg p-4">
                <div className="text-2xl mb-2">📄</div>
                <h4 className="font-semibold text-gray-800">Información</h4>
                <p className="text-sm text-gray-600">Sinopsis y datos clave</p>
              </div>
            </div>
            
            <a
              href="/nuestras-voces-documental.pdf"
              download="Nuestras Voces - Documental.pdf"
              className="btn-secondary px-8 py-3 inline-block"
            >
              📥 Descargar Kit Completo
            </a>
          </div>
          
          {/* Gamificación - Puntos por compartir */}
          <div className="bg-gradient-to-r from-primary-teal to-primary-blue rounded-2xl text-white p-8">
            <h3 className="text-2xl font-bold mb-4">🎮 Gana Puntos Compartiendo</h3>
            <p className="text-lg mb-6 opacity-90">
              Comparte en redes sociales y gana puntos canjeables por fondos de pantalla exclusivos
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">+50</div>
                <div className="text-sm opacity-90">Por compartir en WhatsApp</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">+100</div>
                <div className="text-sm opacity-90">Por post en Instagram</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">+200</div>
                <div className="text-sm opacity-90">Por video en TikTok</div>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="bg-white text-primary-teal font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                🏆 Ver Mis Puntos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialShare