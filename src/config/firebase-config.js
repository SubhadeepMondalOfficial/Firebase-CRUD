// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDirjTQJ5VEnx3XmJMB5ixeaKvi57NDDVU",
  authDomain: "fir-crud-74633.firebaseapp.com",
  projectId: "fir-crud-74633",
  storageBucket: "fir-crud-74633.appspot.com",
  messagingSenderId: "422917987895",
  appId: "1:422917987895:web:9ed2b2a7162b99660729b2",
  measurementId: "G-49RJ41745L"
};

// Initialize Firebase
const firebaseConfigApp = initializeApp(firebaseConfig);
export default firebaseConfigApp;
