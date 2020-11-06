import * as firebase from "firebase/app";

import "firebase/storage";
import "firebase/firestore";

// firebase init goes here
const firebaseConfig = {
  apiKey: "AIzaSyDQTkz9_9Buz28FJfWPDA7VCrEi3XuLEis",
  authDomain: "cinema-city-6e100.firebaseapp.com",
  databaseURL: "https://cinema-city-6e100.firebaseio.com",
  projectId: "cinema-city-6e100",
  storageBucket: "cinema-city-6e100.appspot.com",
  messagingSenderId: "714040656071",
  appId: "1:714040656071:web:e099e38d76673edaae7ee2",
  measurementId: "G-SNHGQ20814",
};
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const st = firebase.storage();
// const auth = firebase.auth()
const fb = firebase;
// db.enablePersistence()
//   .then(() => {
//     console.log('Offline support enabled')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

export { db, st, fb };
