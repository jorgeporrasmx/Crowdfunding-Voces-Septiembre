import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { rewards } from '../src/data/rewards.js'

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGyAQ4sXfl8tf6d3YLY_keNgk54mNzcRI",
  authDomain: "nuestras-voces-crowdfunding.firebaseapp.com",
  projectId: "nuestras-voces-crowdfunding",
  storageBucket: "nuestras-voces-crowdfunding.firebasestorage.app",
  messagingSenderId: "988855308591",
  appId: "1:988855308591:web:d24b6611f6104bab3651da"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seedRewards() {
  console.log('🌱 Iniciando seed de recompensas...\n')

  try {
    let count = 0

    for (const reward of rewards) {
      const rewardData = {
        level: reward.level,
        name: reward.name,
        amount: reward.amount,
        color: reward.color,
        icon: reward.icon,
        benefits: reward.benefits,
        popular: reward.popular || false,
        isActive: true,
        stock: null, // null = ilimitado
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const docRef = await addDoc(collection(db, 'rewards'), rewardData)
      console.log(`✅ Nivel ${reward.level}: ${reward.name} - ID: ${docRef.id}`)
      count++
    }

    console.log(`\n🎉 ¡Completado! ${count} recompensas importadas exitosamente.`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error al importar recompensas:', error)
    process.exit(1)
  }
}

seedRewards()
