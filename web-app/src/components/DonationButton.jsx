import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import DonationForm from './DonationForm'
import AuthModal from './auth/AuthModal'

const DonationButton = ({
  children = "💝 Quiero ser parte",
  className = "btn-primary text-xl px-12 py-4 shadow-xl",
  initialAmount = "",
  reward = null
}) => {
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { isAuthenticated } = useAuth()

  const handleClick = () => {
    if (isAuthenticated) {
      setShowDonationForm(true)
    } else {
      setShowAuthModal(true)
    }
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    setShowDonationForm(true)
  }

  return (
    <>
      <button
        className={className}
        onClick={handleClick}
      >
        {children}
      </button>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={handleAuthSuccess}
        />
      )}

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