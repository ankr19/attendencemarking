// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfAD0xgRqmwH0Yq8ZNN_97H9AkgeQiowo",
  authDomain: "webhosting-6076c.firebaseapp.com",
  projectId: "webhosting-6076c",
  storageBucket: "webhosting-6076c.firebasestorage.app",
  messagingSenderId: "205011374368",
  appId: "1:205011374368:web:ca91a80317969ffd92c745",
  measurementId: "G-QJ8BJX0RMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);