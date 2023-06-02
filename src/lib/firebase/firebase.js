import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage"; // Import the storage module directly

import getFirebaseConfig from './config'

firebase.initializeApp(getFirebaseConfig());

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

// const createUserProfileDocument = async (user, additionalData) => {
//   if (!user) return;

//   const userRef = db.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     const { username, email, dob } = user;

//     let usernameS = username;
//     if (email.includes("@")) {
//       usernameS = username.split("@")[0];
//     }
//     const randomNumbers = Math.floor(Math.random() * 10000);
//     const displayName = `${usernameS}${randomNumbers}`;

//     const createdAt = new Date();

//     const isVerified = false;
//     const followers = 0;
//     const following = 0;
//     const profilePicture = null;
//     const profileBanner = null;
//     const bio = null;

//     try {
//       await userRef.set({
//         username,
//         displayName,
//         email,
//         dob,
//         profilePicture,
//         profileBanner,
//         bio,
//         followers,
//         following,
//         createdAt,
//         isVerified,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.log("Error creating user profile", error.message);
//     }
//   } else {
//     console.log("Already exist");
//   }

//   return userRef;
// };

// const getUserProfileByUsername = async (username) => {
//   const usersRef = db.collection("users");
//   const q = usersRef.where("username", "==", username);

//   const querySnapshot = await q.get();
//   if (querySnapshot.empty) {
//     return null;
//   }

//   const userData = querySnapshot.docs[0].data();
//   return userData;
// };

// const getCurrentUserData = async (field) => {
//   // Get the currently logged-in user
//   const currentUser = auth.currentUser;

//   if (currentUser) {
//     const userId = currentUser.uid;
//     const userRef = db.collection("users").doc(userId);
//     const userSnapshot = await userRef.get();

//     if (userSnapshot.exists) {
//       const userData = userSnapshot.data();
//       const fieldValue = userData[field];

//       return fieldValue;
//     }
//   }

//   return null;
// };

// const isUsernameAlreadyTaken = async (username) => {
//   const querySnapshot = await db
//     .collection("users")
//     .where("username", "==", username)
//     .get();
//   return !querySnapshot.empty;
// };

// const updateUsername = async (userId, newUsername) => {
//   const userRef = db.collection("users").doc(userId);

//   try {
//     await userRef.update({ username: newUsername });
//     console.log("Username updated successfully.");
//   } catch (error) {
//     console.log("Error updating username", error.message);
//   }
// };

export {
  auth,
  provider,
  storage,
  // createUserProfileDocument,
  // getUserProfileByUsername,
  // getCurrentUserData,
  // isUsernameAlreadyTaken,
  // updateUsername,
};
export default db;
