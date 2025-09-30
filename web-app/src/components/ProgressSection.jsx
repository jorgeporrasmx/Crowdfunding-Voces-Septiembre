import { useState, useEffect } from 'react'
import { formatMoney } from '../utils/formatMoney'
import DonationButton from './DonationButton'

const ProgressSection = () => {
  // Mock data - en producción vendría de una API
  const [currentAmount, setCurrentAmount] = useState(0)
  const [targetAmount] = useState(5000000)
  const [donorCount, setDonorCount] = useState(0)
  
  const progressPercentage = (currentAmount / targetAmount) * 100
  
  // Simulación deshabilitada - valores estáticos
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentAmount(prev => prev + Math.floor(Math.random() * 1000))
  //     if (Math.random() > 0.7) {
  //       setDonorCount(prev => prev + 1)
  //     }
  //   }, 5000)
  //
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-primary-teal/10 to-primary-blue/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título de sección */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
              Progreso de la Campaña
            </h2>
            <p className="text-xl text-gray-600">
              Transparencia total en tiempo real
            </p>
          </div>
          
          {/* Card principal de progreso */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-primary-teal">
            {/* Números principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-bold text-primary-teal mb-2">
                  {formatMoney(currentAmount)}
                </div>
                <div className="text-lg text-gray-600">
                  de {formatMoney(targetAmount)} recaudados
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-4xl md:text-6xl font-bold text-primary-orange mb-2">
                  {donorCount}
                </div>
                <div className="text-lg text-gray-600">
                  personas han donado
                </div>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Progreso</span>
                <span className="text-sm font-bold text-primary-teal">
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-teal to-primary-blue transition-all duration-1000 ease-out relative"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                >
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Stats adicionales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gradient-to-br from-primary-teal/10 to-primary-teal/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-teal">0%</div>
                <div className="text-sm text-gray-600">de la meta</div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-orange/10 to-primary-orange/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-orange">∞</div>
                <div className="text-sm text-gray-600">días restantes</div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-blue/10 to-primary-blue/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-blue">{donorCount > 0 ? formatMoney(currentAmount / donorCount) : '$0'}</div>
                <div className="text-sm text-gray-600">promedio</div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-purple/10 to-primary-purple/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary-purple">--</div>
                <div className="text-sm text-gray-600">último donante</div>
              </div>
            </div>
            
            {/* Mensaje motivacional */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-primary-teal/10 to-primary-orange/10 rounded-xl p-6 border border-primary-teal/20">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  🎯 ¡Cada donación nos acerca más a completar "Nuestras Voces"!
                </p>
                <p className="text-gray-600">
                  Modelo "keep-it-all": Sin mínimo requerido, todos los fondos van directamente al proyecto.
                </p>
              </div>
            </div>
            
            {/* Botón de donación */}
            <div className="text-center mt-8">
              <DonationButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgressSection