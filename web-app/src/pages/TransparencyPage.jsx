import { Link } from 'react-router-dom'
import TransparencyDashboard from '../components/TransparencyDashboard'

const TransparencyPage = () => {
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-4">
          Transparencia Total
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Conoce exactamente cómo se utilizan los fondos recaudados para hacer realidad 
          "Nuestras Voces". Aquí encontrarás información actualizada en tiempo real.
        </p>
        <div className="mt-6">
          <Link 
            to="/" 
            className="bg-primary-teal text-white px-6 py-3 rounded-lg hover:bg-primary-teal/90 transition-colors"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </div>
      
      <TransparencyDashboard />
    </div>
  )
}

export default TransparencyPage