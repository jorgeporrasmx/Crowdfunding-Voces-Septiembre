import { useState } from 'react'
import RewardCard from './RewardCard'
import { formatMoney } from '../utils/formatMoney'
import { rewards } from '../data/rewards'

const RewardsSection = () => {
  const [selectedReward, setSelectedReward] = useState(null)

  return (
    <section id="recompensas" className="py-20 bg-gradient-to-br from-neutral-light to-primary-teal/5">
      <div className="container mx-auto px-4">
        {/* Título de sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-6">
            Recompensas Exclusivas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            11 niveles únicos de recompensas que celebran el arte del doblaje mexicano. 
            Desde contenido digital exclusivo hasta experiencias únicas con el equipo creativo.
          </p>
        </div>

        {/* Nota importante */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-primary-teal/10 to-primary-orange/10 rounded-2xl p-6 border-l-4 border-primary-teal">
            <p className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="text-2xl mr-3">⭐</span>
              Todos los niveles incluyen el nombre en los créditos del documental como mínimo
            </p>
          </div>
        </div>

        {/* Grid de recompensas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {rewards.map((reward) => (
            <RewardCard 
              key={reward.id}
              reward={reward}
              isSelected={selectedReward === reward.id}
              onSelect={() => setSelectedReward(reward.id)}
              formatMoney={formatMoney}
            />
          ))}
        </div>

        {/* Elementos comodín */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-primary-purple">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3">💡</span>
              Elementos "Comodín" Adicionales
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🏆</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Certificados Digitales</h4>
                    <p className="text-gray-600">Apoyo al cine documental independiente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-xl">⏰</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Cápsula de Tiempo</h4>
                    <p className="text-gray-600">Carta del equipo para abrir en 5 años</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🎮</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Insignias Coleccionables</h4>
                    <p className="text-gray-600">Una insignia digital por cada nivel</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🎬</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Sorteo Exclusivo</h4>
                    <p className="text-gray-600">Para asistir al rodaje o sesión de doblaje</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              ¿Listo para formar parte de la historia del doblaje mexicano?
            </p>
            <button 
              className="btn-primary text-2xl px-12 py-4 shadow-xl"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              🎤 Quiero ser parte
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RewardsSection