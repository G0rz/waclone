// Import the functions you need from the SDKs you need
import firebase from 'firebase';//Libreria principal de firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBK1RF1-cqEZpUOqglpkoNqifLwd7bw_8c",
  authDomain: "waclone-19cb0.firebaseapp.com",
  databaseURL: "https://waclone-19cb0-default-rtdb.firebaseio.com",
  projectId: "waclone-19cb0",
  storageBucket: "waclone-19cb0.appspot.com",
  messagingSenderId: "287243446195",
  appId: "1:287243446195:web:c6310d9f6654a42c0a4dc6"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db
