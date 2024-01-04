import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  databaseURL: "https://honey-react-default-rtdb.europe-west1.firebasedatabase.app",
  
  apiKey: "AIzaSyCAOnBMCHfjqhp84EqtzcJ61LUjxCy8zPQ",
  authDomain: "honey-react.firebaseapp.com",
  projectId: "honey-react",
  storageBucket: "honey-react.appspot.com",
  messagingSenderId: "264665378797",
  appId: "1:264665378797:web:77e8aa945470adb5cb01e4"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage, firebase as default}
