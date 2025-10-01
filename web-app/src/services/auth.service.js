import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db, handleFirebaseError } from './firebaseClient'

const googleProvider = new GoogleAuthProvider()

/**
 * Servicio de autenticación
 */
class AuthService {
  /**
   * Registrar nuevo usuario
   */
  async register(email, password, fullName) {
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Actualizar perfil con nombre
      await updateProfile(user, { displayName: fullName })

      // Crear documento en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        fullName: fullName,
        role: 'donor',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      // Enviar email de verificación
      await sendEmailVerification(user)

      return { success: true, user }
    } catch (error) {
      console.error('Error in register:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Iniciar sesión
   */
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      console.error('Error in login:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Iniciar sesión con Google
   */
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Verificar si el usuario ya existe en Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))

      // Si no existe, crear documento
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          fullName: user.displayName,
          photoURL: user.photoURL,
          role: 'donor',
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

      return { success: true, user }
    } catch (error) {
      console.error('Error in loginWithGoogle:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      console.error('Error in logout:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Recuperar contraseña
   */
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (error) {
      console.error('Error in resetPassword:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener perfil de usuario desde Firestore
   */
  async getUserProfile(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))

      if (!userDoc.exists()) {
        return { success: false, error: 'Usuario no encontrado' }
      }

      return { success: true, profile: userDoc.data() }
    } catch (error) {
      console.error('Error in getUserProfile:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser() {
    return auth.currentUser
  }

  /**
   * Observer de estado de autenticación
   */
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback)
  }
}

// Exportar instancia singleton
const authService = new AuthService()
export default authService
