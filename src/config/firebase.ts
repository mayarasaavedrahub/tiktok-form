import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';


import firebase from 'firebase/app';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeQ9Mxaqn12n3Kex5C-LSZXQlZchbdCUE",
  authDomain: "ti-hub-45f33.firebaseapp.com",
  databaseURL: "https://ti-hub-45f33-default-rtdb.firebaseio.com",
  projectId: "ti-hub-45f33",
  storageBucket: "ti-hub-45f33.appspot.com",
  messagingSenderId: "747863066829",
  appId: "1:747863066829:web:1f3e1218e6b143cd564184",
  measurementId: "G-ZJDEDMN59R"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);


