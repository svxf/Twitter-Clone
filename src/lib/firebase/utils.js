import db, { auth } from "./firebase";
import { tweetsCollection, usersCollection } from "./collections";

import {
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  limit,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { storage } from "./firebase";

// export async function checkUsernameAvailability(username) {
//   console.log(username);
//   const querySnapshot = await getDocs(
//     query(usersCollection, where("username", "==", username), limit(1))
//   );

//   return querySnapshot.empty;
// }
export async function checkUsernameAvailability(username) {
  const querySnapshot = await db
    .collection("users")
    .where("username", "==", username)
    .get();
  return !querySnapshot.empty;
}

export async function updateUserData(userId, userData) {
  const userRef = doc(usersCollection, userId);
  console.log('updating: '+userData);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp(),
  });
}

export async function updateUsername(userId, username) {
  const userRef = doc(usersCollection, userId);
  await updateDoc(userRef, {
    ...(username && { username }),
    updatedAt: serverTimestamp(),
  });
}

export async function getUserProfileByUsername(username) {
  const querySnapshot = await getDocs(
    query(usersCollection, where("username", "==", username), limit(1))
  );

  if (querySnapshot.empty) {
    return null;
  }
  const userData = querySnapshot.docs[0].data();
  return userData;
}

export async function getUserProfileById(userId) {
  const userRef = doc(usersCollection, userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.log("User profile not found.");
    return null;
  }
}

export async function getPFP(userId) {
  const userData = await getUserProfileById(userId);
  
  if (userData.profilePicture != "defaultPFP.png" && userData.profilePicture != null) {
    const storageRef = storage
      .ref()
      .child(`pfps/${userId}/${userData.profilePicture}`);
    const profilePictureURL = await storageRef.getDownloadURL();
    return profilePictureURL;
  } else {
    const storageRef = storage.ref().child(`pfps/defaultPFP.png`);
    const profilePictureURL = await storageRef.getDownloadURL();
    return profilePictureURL;
  }
}
export async function getBanner(userId) {
  const userData = await getUserProfileById(userId);
  
  if (userData.profileBanner != null) {
    const storageRef = storage
      .ref()
      .child(`pfps/${userId}/${userData.profileBanner}`);
    const profilePictureURL = await storageRef.getDownloadURL();
    return profilePictureURL;
  } else {
    return null;
  }
}

export async function getRandomUserData() {
  const usersRef = usersCollection;

  try {
    const querySnapshot = await getDocs(usersRef);
    if (!querySnapshot.empty) {
      const users = querySnapshot.docs.map((doc) => doc.data());
      const randomIndex = Math.floor(Math.random() * users.length);
      const userData = users[randomIndex];
      return userData;
    }
  } catch (error) {
    console.log("Error fetching random user", error.message);
  }

  return null;
}

export async function getCurrentUserData(field) {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const userId = currentUser.uid;
    const userRef = doc(usersCollection, userId);
    const userSnapshot = await getDoc(userRef);
    
    if (userSnapshot.exists) {
      const userData = userSnapshot.data();
      const fieldValue = userData[field];
      return fieldValue;
    }
  }

  return null;
}

// export async function createUserProfile(user, additionalData) {
//   if (!user) return;

//   const userRef = doc(usersCollection, user.uid);
//   const snapshot = await getDoc(userRef);

//   if (!snapshot.exists) {
//     const { username, email, dob } = user;

//     console.error(username);

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
// }
export async function createUserProfile(user, additionalData) {
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    console.log("SNAPSHOT DOES NOT EXIST")
    const { email, dob } = user;

    // const randomNumbers = Math.floor(Math.random() * 10000);
    let un = email.split("@")[0];
    // let username = `${un}${randomNumbers}`;
    let username = un;
    const displayName = un

    const createdAt = new Date();

    const isVerified = false;
    const followers = 0;
    const following = 0;
    const profilePicture = "defaultPFP.png";
    const profileBanner = null;
    const bio = null;
    const canChoose = true;

    try {
      await userRef.set({
        username,
        displayName,
        email,
        dob,
        profilePicture,
        profileBanner,
        bio,
        followers,
        following,
        createdAt,
        isVerified,
        uid: user.uid,
        canChoose,
        ...additionalData,
      });
      console.log("CREATED USER DATA")
    } catch (error) {
      console.log("Error creating user profile", error.message);
    }
  } else {
    console.log("Already exist");
  }

  return userRef;
}

export async function addTweet(userId, tweetData) {
  const userRef = doc(usersCollection, userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    console.log("yes");
    // const postsCollectionRef = db.collection(db, 'posts');
    await addDoc(db.collection(db, "posts"), tweetData);
  } else {
    console.log("User profile not found.");
  }
}
// export async function addTweet(userId, tweetData) {
//   const userRef = doc(usersCollection, userId);
//   const userDoc = await getDoc(userRef);
//   if (userDoc.exists()) {
//     const postRef = await addDoc(tweetsCollection(db, 'posts'), tweetData)
//     const postDoc = await addDoc(postRef, tweetData);
//     const postId = postDoc.id;

//     // const subcollectionRef = collection(postRef, postId, 'subcollection');
//     // Add documents to the subcollection as needed
//     await addDoc(subcollectionRef, { /* subcollection document data */ });
//   } else {
//     console.log('User profile not found.');
//   }
// }
