// Import the functions you need from the SDKs you need
import firebase from 'firebase';//Libreria principal de firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "****************************************",
    authDomain: "****************************************",
    projectId: "****************************************",
    storageBucket: "****************************************",
    messagingSenderId: "****************************************",
    appId: "****************************************",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db
