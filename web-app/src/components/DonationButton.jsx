import { useState } from 'react'
import DonationForm from './DonationForm'

const DonationButton = ({ 
  children = "💝 Quiero ser parte", 
  className = "btn-primary text-xl px-12 py-4 shadow-xl",
  initialAmount = "",
  reward = null
}) => {
  const [showDonationForm, setShowDonationForm] = useState(false)

  return (
    <>
      <button 
        className={className}
        onClick={() => setShowDonationForm(true)}
      >
        {children}
      </button>

      {showDonationForm && (
        <DonationForm
          onClose={() => setShowDonationForm(false)}
          initialAmount={initialAmount}
          reward={reward}
        />
      )}
    </>
  )
}

export default DonationButton