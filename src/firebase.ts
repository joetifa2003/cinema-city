import * as firebase from 'firebase/app'

import 'firebase/storage'
import 'firebase/firestore'

// firebase init goes here
const firebaseConfig = {
  apiKey: "AIzaSyCa_vIsr-DlLlAMF_LZlVf4Rnx8PXxpCPc",
  authDomain: "cinema-city-fabb2.firebaseapp.com",
  databaseURL: "https://cinema-city-fabb2.firebaseio.com",
  projectId: "cinema-city-fabb2",
  storageBucket: "cinema-city-fabb2.appspot.com",
  messagingSenderId: "647068516174",
  appId: "1:647068516174:web:e2d1eded6bbcd23f05281f",
  measurementId: "G-NTNM7D8G4E"
}
firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()
const st = firebase.storage()
// const auth = firebase.auth()
const fb = firebase
db.enablePersistence()
  .then(() => {
    console.log('Offline support enabled')
  })
  .catch((err) => {
    console.log(err)
  })

export { db, st, fb }