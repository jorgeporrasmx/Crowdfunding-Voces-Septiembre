import HeroSection from '../components/HeroSection'
import ProgressSection from '../components/ProgressSection'
import RewardsSection from '../components/RewardsSection'
import VideoSection from '../components/VideoSection'
import OnePagerSection from '../components/OnePagerSection'
import TransparencyPreview from '../components/TransparencyPreview'
import SocialShare from '../components/SocialShare'
import FAQ from '../components/FAQ'
import DonateNowButton from '../components/DonateNowButton'

const HomePage = () => {
  
  return (
    <div>
      <HeroSection />
      
      <ProgressSection />
      <DonateNowButton 
        variant="secondary" 
        size="medium" 
        className="py-8 bg-white/50" 
      />
      
      <VideoSection />
      <DonateNowButton 
        variant="primary" 
        size="large" 
        className="py-10 bg-gradient-to-r from-primary-orange/10 to-primary-teal/10" 
      />
      
      <OnePagerSection />
      <DonateNowButton 
        variant="outline" 
        size="medium" 
        className="py-8 bg-neutral-light/30" 
      />
      
      <RewardsSection />
      
      <TransparencyPreview />
      <DonateNowButton 
        variant="secondary" 
        size="medium" 
        className="py-8 bg-primary-teal/5" 
      />
      
      <SocialShare />
      <DonateNowButton 
        variant="primary" 
        size="large" 
        className="py-10 bg-gradient-to-br from-primary-purple/10 to-primary-orange/10" 
      />
      
      <FAQ />
      <DonateNowButton 
        variant="primary" 
        size="large" 
        className="py-12 bg-gradient-to-t from-primary-teal/20 to-transparent" 
      />
    </div>
  )
}

export default HomePage