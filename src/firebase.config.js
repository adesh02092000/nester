import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD0vxHbUaMH-NXHa4GcxqrFyPMZ7qXBEYs',
  authDomain: 'house-marketplace-d9ee5.firebaseapp.com',
  projectId: 'house-marketplace-d9ee5',
  storageBucket: 'house-marketplace-d9ee5.appspot.com',
  messagingSenderId: '998449487778',
  appId: '1:998449487778:web:d40b1f9b6e1131519f5cfb',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
