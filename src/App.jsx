import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TransparencyPage from './pages/TransparencyPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/transparencia" element={<TransparencyPage />} />
            <Route path="/terminos" element={<TermsPage />} />
            <Route path="/privacidad" element={<PrivacyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App