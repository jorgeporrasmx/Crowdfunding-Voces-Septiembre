const DonateNowButton = ({ variant = 'primary', size = 'large', className = '' }) => {
  const scrollToRewards = () => {
    const rewardsSection = document.getElementById('recompensas')
    if (rewardsSection) {
      rewardsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg'
  }

  const variantClasses = {
    primary: 'bg-primary-orange hover:bg-primary-orange/90 text-white',
    secondary: 'bg-primary-teal hover:bg-primary-teal/90 text-white',
    outline: 'border-2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-white'
  }

  return (
    <div className={`text-center ${className}`}>
      <button
        onClick={scrollToRewards}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          font-bold rounded-full
          transform transition-all duration-300
          hover:scale-105 hover:shadow-xl
          animate-pulse-slow
          inline-flex items-center gap-2
        `}
      >
        <span>💖</span>
        <span>DONAR AHORA</span>
        <span>→</span>
      </button>
    </div>
  )
}

export default DonateNowButton