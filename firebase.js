import * as firebase from 'firebase'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBf4oJVJ3TTDZNR5zWPeq75HM87Pd09_rY",
  authDomain: "spendees-6210545556.firebaseapp.com",
  projectId: "spendees-6210545556",
  storageBucket: "spendees-6210545556.appspot.com",
  messagingSenderId: "321539801825",
  appId: "1:321539801825:web:53db6bef189f814e8c6da0"
}

let app
if ((firebase.apps.length === 0)) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = app.firestore()

export {auth, db}
