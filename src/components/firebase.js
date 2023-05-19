import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCVoSyQeuIDwJ9vjgl0FUcSwN1F8404Iic",
  authDomain: "twitter-clone-5f618.firebaseapp.com",
  databaseURL: "https://twitter-clone-5f618-default-rtdb.firebaseio.com",
  projectId: "twitter-clone-5f618",
  storageBucket: "twitter-clone-5f618.appspot.com",
  messagingSenderId: "330787378263",
  appId: "1:330787378263:web:05e2a9e9ab760536f47f12",
  measurementId: "G-FY584M73KW"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { username, email, dob } = user;
    const createdAt = new Date();
    const isVerified = false;

    try {
      await userRef.set({
        username,
        email,
        dob,
        createdAt,
        isVerified,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user profile", error.message);
    }
  }

  return userRef;
};

const getUserProfileByUsername = async (username) => {
  const usersRef = db.collection('users');
  const q = usersRef.where('username', '==', username);

  const querySnapshot = await q.get();
  if (querySnapshot.empty) {
    return null;
  }

  const userData = querySnapshot.docs[0].data();
  return userData;
};

// const getUserProfileByUsername = async (user) => {
//   if (!user) return;

//   const userRef = db.doc(`users/${user.username}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     console.log("Found username");
//     console.log(user.username)
//     return user.username;
//   } else {
//     console.log("Is null");
//     return null;
//   }
// };

export { auth, provider, createUserProfileDocument, getUserProfileByUsername };
export default db;
