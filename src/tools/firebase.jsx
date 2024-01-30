// Import the functions you need from the SDKs you need
import firebase from 'firebase';//Libreria principal de firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCN1F_kXFgiKMu10xjFlVTbcsq_P2ifFsc",
    authDomain: "devfest-9eba1.firebaseapp.com",
    projectId: "devfest-9eba1",
    storageBucket: "devfest-9eba1.appspot.com",
    messagingSenderId: "202434832860",
    appId: "1:202434832860:web:b72e81785a2c3b74470719",
    measurementId: "G-M7E1SJZPG5"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db