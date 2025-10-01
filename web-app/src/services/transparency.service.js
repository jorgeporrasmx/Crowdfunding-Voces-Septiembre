import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db, handleFirebaseError } from './firebaseClient'

/**
 * Servicio de transparencia
 */
class TransparencyService {
  /**
   * Obtener estadísticas de la campaña
   */
  async getCampaignStats() {
    try {
      // Obtener todas las donaciones completadas
      const q = query(
        collection(db, 'donations'),
        where('status', '==', 'completed')
      )

      const querySnapshot = await getDocs(q)

      let totalAmount = 0
      let donorCount = 0
      const donations = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        totalAmount += data.amount || 0
        donorCount++
        donations.push(data)
      })

      // Calcular estadísticas adicionales
      const avgDonation = donorCount > 0 ? totalAmount / donorCount : 0

      // Donaciones de esta semana
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const thisWeekDonations = donations.filter(d => {
        const createdAt = d.createdAt?.toDate()
        return createdAt && createdAt >= oneWeekAgo
      })

      const thisWeekAmount = thisWeekDonations.reduce((sum, d) => sum + (d.amount || 0), 0)

      // Donaciones de este mes
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

      const thisMonthDonations = donations.filter(d => {
        const createdAt = d.createdAt?.toDate()
        return createdAt && createdAt >= oneMonthAgo
      })

      const thisMonthAmount = thisMonthDonations.reduce((sum, d) => sum + (d.amount || 0), 0)

      return {
        success: true,
        stats: {
          totalAmount,
          donorCount,
          avgDonation,
          thisWeekAmount,
          thisWeekDonors: thisWeekDonations.length,
          thisMonthAmount,
          thisMonthDonors: thisMonthDonations.length
        }
      }
    } catch (error) {
      console.error('Error in getCampaignStats:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener donaciones recientes para el feed público
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
        const data = doc.data()
        donations.push({
          id: doc.id,
          donorName: data.isAnonymous ? 'Donante Anónimo' : data.donorName,
          amount: data.amount,
          createdAt: data.createdAt
        })
      })

      return { success: true, donations }
    } catch (error) {
      console.error('Error in getRecentDonations:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener gastos (expenses) para transparencia
   */
  async getExpenses() {
    try {
      const q = query(
        collection(db, 'expenses'),
        orderBy('date', 'desc')
      )

      const querySnapshot = await getDocs(q)
      const expenses = []
      const breakdown = {}

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        expenses.push({
          id: doc.id,
          ...data
        })

        // Acumular por categoría
        const category = data.category || 'other'
        if (!breakdown[category]) {
          breakdown[category] = 0
        }
        breakdown[category] += data.amount || 0
      })

      return {
        success: true,
        expenses,
        breakdown
      }
    } catch (error) {
      console.error('Error in getExpenses:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }
}

// Exportar instancia singleton
const transparencyService = new TransparencyService()
export default transparencyService
