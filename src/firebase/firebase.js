// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = import.meta.env.VITE_apiKey;
const authDomain = import.meta.env.VITE_authDomain;
const projectId = import.meta.env.VITE_projectId;
const storageBucket = import.meta.env.VITE_storageBucket;
const messagingSenderId = import.meta.env.VITE_messagingSenderId;
const appId = import.meta.env.VITE_appId;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};
/*
const firestoreDB = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false, // and this line
  })*/
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
