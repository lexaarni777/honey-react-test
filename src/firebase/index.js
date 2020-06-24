import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA4Q5_de3gsjL9Y9cQPOArEqm-n7v7hcN8",
    authDomain: "honey-9d267.firebaseapp.com",
    databaseURL: "https://honey-9d267.firebaseio.com",
    projectId: "honey-9d267",
    storageBucket: "honey-9d267.appspot.com",
    messagingSenderId: "637446227306",
    appId: "1:637446227306:web:1fabbfc8eeff3f6bac9113"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage, firebase as default}
