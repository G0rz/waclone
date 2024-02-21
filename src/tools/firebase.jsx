// Import the functions you need from the SDKs you need
import firebase from 'firebase';//Libreria principal de firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCRO9z_G2d7DfjI6ztmzQDVMKtAmPeXkcQ",
    authDomain: "waclone-e4acb.firebaseapp.com",
    projectId: "waclone-e4acb",
    storageBucket: "waclone-e4acb.appspot.com",
    messagingSenderId: "175252664012",
    appId: "1:175252664012:web:d573aaa8aedacbe04b1c69"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db
