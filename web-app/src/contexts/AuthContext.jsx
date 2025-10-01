import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/auth.service'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Observar cambios en el estado de autenticación
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const register = async (email, password, displayName) => {
    setLoading(true)
    const result = await authService.register(email, password, displayName)
    setLoading(false)

    if (result.success) {
      setUser(result.user)
    }

    return result
  }

  const login = async (email, password) => {
    setLoading(true)
    const result = await authService.login(email, password)
    setLoading(false)

    if (result.success) {
      setUser(result.user)
    }

    return result
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    const result = await authService.loginWithGoogle()
    setLoading(false)

    if (result.success) {
      setUser(result.user)
    }

    return result
  }

  const logout = async () => {
    setLoading(true)
    const result = await authService.logout()
    setLoading(false)

    if (result.success) {
      setUser(null)
    }

    return result
  }

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
