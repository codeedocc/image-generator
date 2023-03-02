import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'dalle-clone-66690.firebaseapp.com',
  projectId: 'dalle-clone-66690',
  storageBucket: 'dalle-clone-66690.appspot.com',
  messagingSenderId: '853671962668',
  appId: '1:853671962668:web:33667cb441db96a5e30989',
}

const app = initializeApp(firebaseConfig)
