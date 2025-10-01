import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db, handleFirebaseError } from './firebaseClient'

/**
 * Servicio de donaciones
 */
class DonationsService {
  /**
   * Crear nueva donación
   */
  async createDonation(donationData) {
    try {
      const {
        amount,
        donorName,
        donorEmail,
        message,
        isAnonymous,
        rewardId,
        userId
      } = donationData

      // Generar código de donante
      const donorCode = this.generateDonorCode()

      const donation = {
        amount: Number(amount),
        donorName: isAnonymous ? 'Donante Anónimo' : donorName,
        donorEmail,
        message: message || '',
        isAnonymous: Boolean(isAnonymous),
        rewardId: rewardId || null,
        userId: userId || null,
        donorCode,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, 'donations'), donation)

      return {
        success: true,
        donationId: docRef.id,
        donorCode
      }
    } catch (error) {
      console.error('Error in createDonation:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener donación por ID
   */
  async getDonation(donationId) {
    try {
      const donationDoc = await getDoc(doc(db, 'donations', donationId))

      if (!donationDoc.exists()) {
        return { success: false, error: 'Donación no encontrada' }
      }

      return {
        success: true,
        donation: {
          id: donationDoc.id,
          ...donationDoc.data()
        }
      }
    } catch (error) {
      console.error('Error in getDonation:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener donación por código de donante
   */
  async getDonationByCode(donorCode) {
    try {
      const q = query(
        collection(db, 'donations'),
        where('donorCode', '==', donorCode),
        limit(1)
      )

      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return { success: false, error: 'Código de donante no encontrado' }
      }

      const doc = querySnapshot.docs[0]
      return {
        success: true,
        donation: {
          id: doc.id,
          ...doc.data()
        }
      }
    } catch (error) {
      console.error('Error in getDonationByCode:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener donaciones de un usuario
   */
  async getUserDonations(userId) {
    try {
      const q = query(
        collection(db, 'donations'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      const donations = []

      querySnapshot.forEach((doc) => {
        donations.push({
          id: doc.id,
          ...doc.data()
        })
      })

      return { success: true, donations }
    } catch (error) {
      console.error('Error in getUserDonations:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener donaciones recientes (públicas)
   */
  async getRecentDonations(limitCount = 10) {
    try {
      const q = query(
        collection(db, 'donations'),
        where('status', '==', 'completed'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      )

      const querySnapshot = await getDocs(q)
      const donations = []

      querySnapshot.forEach((doc) => {
        donations.push({
          id: doc.id,
          ...doc.data()
        })
      })

      return { success: true, donations }
    } catch (error) {
      console.error('Error in getRecentDonations:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Actualizar estado de donación
   */
  async updateDonationStatus(donationId, status, transactionId = null) {
    try {
      const updates = {
        status,
        updatedAt: serverTimestamp()
      }

      if (status === 'completed') {
        updates.completedAt = serverTimestamp()
      }

      if (transactionId) {
        updates.transactionId = transactionId
      }

      await updateDoc(doc(db, 'donations', donationId), updates)

      return { success: true }
    } catch (error) {
      console.error('Error in updateDonationStatus:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Generar código de donante único
   */
  generateDonorCode() {
    const year = new Date().getFullYear()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `NV-${year}-${random}`
  }
}

// Exportar instancia singleton
const donationsService = new DonationsService()
export default donationsService
