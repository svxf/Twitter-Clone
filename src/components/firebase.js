import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVoSyQeuIDwJ9vjgl0FUcSwN1F8404Iic",
  authDomain: "twitter-clone-5f618.firebaseapp.com",
  databaseURL: "https://twitter-clone-5f618-default-rtdb.firebaseio.com",
  projectId: "twitter-clone-5f618",
  storageBucket: "twitter-clone-5f618.appspot.com",
  messagingSenderId: "330787378263",
  appId: "1:330787378263:web:a191ae9f32e5ff7ef47f12",
  measurementId: "G-XF5Y58MCP6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
