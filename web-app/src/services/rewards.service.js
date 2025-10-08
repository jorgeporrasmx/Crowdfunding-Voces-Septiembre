import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import { db, handleFirebaseError } from './firebaseClient'

/**
 * Servicio de recompensas
 */
class RewardsService {
  /**
   * Obtener todas las recompensas activas
   */
  async getActiveRewards() {
    try {
      const q = query(
        collection(db, 'rewards'),
        where('isActive', '==', true),
        orderBy('level', 'asc')
      )

      const querySnapshot = await getDocs(q)
      const rewards = []

      querySnapshot.forEach((doc) => {
        rewards.push({
          id: doc.id,
          ...doc.data()
        })
      })

      return { success: true, rewards }
    } catch (error) {
      console.error('Error in getActiveRewards:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }

  /**
   * Obtener recompensa por ID
   */
  async getReward(rewardId) {
    try {
      const rewardDoc = await getDoc(doc(db, 'rewards', rewardId))

      if (!rewardDoc.exists()) {
        return { success: false, error: 'Recompensa no encontrada' }
      }

      return {
        success: true,
        reward: {
          id: rewardDoc.id,
          ...rewardDoc.data()
        }
      }
    } catch (error) {
      console.error('Error in getReward:', error)
      return { success: false, error: handleFirebaseError(error) }
    }
  }
}

// Exportar instancia singleton
const rewardsService = new RewardsService()
export default rewardsService
