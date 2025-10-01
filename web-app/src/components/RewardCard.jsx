
import DonationButton from './DonationButton'

const RewardCard = ({ reward, isSelected, onSelect, formatMoney }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      yellow: {
        border: 'hover:border-reward-yellow',
        bg: 'from-reward-yellow/10 to-reward-yellow/5',
        accent: 'text-reward-yellow',
        button: 'bg-reward-yellow hover:bg-reward-yellow/90'
      },
      orange: {
        border: 'hover:border-reward-orange',
        bg: 'from-reward-orange/10 to-reward-orange/5',
        accent: 'text-reward-orange', 
        button: 'bg-reward-orange hover:bg-reward-orange/90'
      },
      blue: {
        border: 'hover:border-reward-blue',
        bg: 'from-reward-blue/10 to-reward-blue/5',
        accent: 'text-reward-blue',
        button: 'bg-reward-blue hover:bg-reward-blue/90'
      },
      purple: {
        border: 'hover:border-reward-purple',
        bg: 'from-reward-purple/10 to-reward-purple/5',
        accent: 'text-reward-purple',
        button: 'bg-reward-purple hover:bg-reward-purple/90'
      },
      red: {
        border: 'hover:border-reward-red',
        bg: 'from-reward-red/10 to-reward-red/5',
        accent: 'text-reward-red',
        button: 'bg-reward-red hover:bg-reward-red/90'
      }
    }
    return colorMap[color] || colorMap.blue
  }

  const colors = getColorClasses(reward.color)
  
  return (
    <div 
      className={`reward-card ${colors.border} ${isSelected ? 'ring-2 ring-primary-teal' : ''} ${reward.popular ? 'ring-2 ring-primary-orange mt-4' : ''} cursor-pointer relative overflow-visible`}
      onClick={onSelect}
    >
      {/* Badge de popular */}
      {reward.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-primary-orange text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            ⭐ POPULAR
          </div>
        </div>
      )}
      
      {/* Header con gradiente */}
      <div className={`bg-gradient-to-br ${colors.bg} p-6 text-center`}>
        <div className="text-4xl mb-2">{reward.icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Nivel {reward.level}: {reward.name}
        </h3>
        <div className={`text-3xl font-black ${colors.accent} mb-2`}>
          {formatMoney(reward.amount)}
        </div>
        <div className="text-sm text-gray-600">
          MXN por única vez
        </div>
      </div>
      
      {/* Beneficios */}
      <div className="p-6">
        <ul className="space-y-3">
          {reward.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="text-primary-teal mt-1 flex-shrink-0">✓</span>
              <span className="text-sm text-gray-800 leading-relaxed">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Footer con botón */}
      <div className="p-6 pt-0">
        <DonationButton
          initialAmount={reward.amount}
          reward={reward}
          className={`w-full ${colors.button} text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105`}
        >
          Seleccionar {reward.name}
        </DonationButton>
        
        {/* Información adicional para niveles altos */}
        {reward.amount >= 10000 && (
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded border">
              🤝 Experiencia Premium
            </span>
          </div>
        )}
        
        {reward.amount >= 100000 && (
          <div className="mt-2 text-center">
            <span className="text-xs text-primary-red bg-primary-red/10 px-2 py-1 rounded font-semibold">
              👑 Nivel VIP Exclusivo
            </span>
          </div>
        )}
      </div>

      {/* Efecto de selección */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-primary-teal rounded-xl pointer-events-none">
          <div className="absolute -top-1 -right-1 bg-primary-teal text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            ✓
          </div>
        </div>
      )}
    </div>
  )
}

export default RewardCard