import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyDvLCZWo1TtRjd0Fg9Of-nlrUf7HiG3NZs",
        authDomain: "smoothierecipe-841b1.firebaseapp.com",
        databaseURL: "https://smoothierecipe-841b1.firebaseio.com",
        projectId: "smoothierecipe-841b1",
        storageBucket: "smoothierecipe-841b1.appspot.com",
        messagingSenderId: "841673827404",
    
    }
    firebase.initializeApp(config)
    // firebase.firestore().settings({timestampsInSnapshots: true})
}
const fireDb = firebase.firestore()

// var recipRef = fireDb.ref('/recSmooth')
export {fireDb}