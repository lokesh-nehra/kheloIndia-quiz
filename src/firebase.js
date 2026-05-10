// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWql2zjBgMsLUtme-gzy15zEqrahaLaaA",
  authDomain: "khelo-india-quiz.firebaseapp.com",
  projectId: "khelo-india-quiz",
  storageBucket: "khelo-india-quiz.firebasestorage.app",
  messagingSenderId: "785484566686",
  appId: "1:785484566686:web:b0258d9ccf49c915c7eb8f",
  measurementId: "G-KFQ1BMNTXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider(); 