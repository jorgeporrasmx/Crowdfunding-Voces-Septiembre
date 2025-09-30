import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MicrophoneIcon, MenuIcon } from './common/Icons'
import DonationButton from './DonationButton'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="bg-white shadow-lg border-b-4 border-primary-purple sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo-nuestras-voces.png"
              alt="Nuestras Voces Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-primary-purple transition-colors font-medium"
            >
              Inicio
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-800 hover:text-primary-purple transition-colors font-medium"
            >
              Proyecto
            </button>
            <button 
              onClick={() => scrollToSection('recompensas')}
              className="text-gray-800 hover:text-primary-purple transition-colors font-medium"
            >
              Recompensas
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-800 hover:text-primary-purple transition-colors font-medium"
            >
              FAQ
            </button>
            <Link 
              to="/transparencia" 
              className="text-gray-800 hover:text-primary-purple transition-colors font-medium"
            >
              Transparencia
            </Link>
            <DonationButton 
              className="btn-primary"
            >
              Quiero ser parte
            </DonationButton>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-800 hover:text-primary-purple transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-800 hover:text-primary-purple transition-colors font-medium text-left"
              >
                Proyecto
              </button>
              <button 
                onClick={() => scrollToSection('recompensas')}
                className="text-gray-800 hover:text-primary-purple transition-colors font-medium text-left"
              >
                Recompensas
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-800 hover:text-primary-purple transition-colors font-medium text-left"
              >
                FAQ
              </button>
              <Link 
                to="/transparencia" 
                className="text-gray-800 hover:text-primary-purple transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Transparencia
              </Link>
              <DonationButton 
                className="btn-primary w-full"
              >
                Quiero ser parte
              </DonationButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header