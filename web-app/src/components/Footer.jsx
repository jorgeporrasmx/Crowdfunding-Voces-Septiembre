import { Link } from 'react-router-dom'
import { MicrophoneIcon, EmailIcon, PhoneIcon, TwitterIcon, FacebookIcon, PinterestIcon } from './common/Icons'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo-morado.png" 
                alt="Nuestras Voces" 
                className="h-12 w-auto object-contain brightness-0 invert"
              />
              <h3 className="text-xl font-display font-bold">Nuestras Voces</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Un documental que celebra el arte del doblaje en México, destacando su valor nostálgico 
              y artesanal. Cada peso cuenta para llevar nuestras voces a la pantalla.
            </p>
            <p className="text-sm text-gray-400">
              Dirigido por Jorge Porras Gamboa
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-primary-purple transition-colors">Inicio</Link></li>
              <li><Link to="/transparencia" className="hover:text-primary-purple transition-colors">Transparencia</Link></li>
              <li><a href="#recompensas" className="hover:text-primary-purple transition-colors">Recompensas</a></li>
              <li><a href="#faq" className="hover:text-primary-purple transition-colors">FAQ</a></li>
              <li className="pt-2 border-t border-gray-700">
                <Link to="/terminos" className="hover:text-primary-purple transition-colors text-sm">Términos y Condiciones</Link>
              </li>
              <li>
                <Link to="/privacidad" className="hover:text-primary-purple transition-colors text-sm">Aviso de Privacidad</Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <EmailIcon className="w-4 h-4 mr-2" />
                hola@sutilde.com
              </p>
              <p className="flex items-center">
                <PhoneIcon className="w-4 h-4 mr-2" />
                +52 614 427 3301
              </p>
            </div>
          </div>
        </div>

        {/* Redes sociales y copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2025 Nuestras Voces. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              SUTILDE, S.A.P.I. de C.V.
            </p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="https://twitter.com/nuestrasvoces" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-primary-purple transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com/nuestrasvoces" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-primary-purple transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com/nuestrasvoces" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-primary-purple transition-colors"
              aria-label="Instagram"
            >
              <PinterestIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer