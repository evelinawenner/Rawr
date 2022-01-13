// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEiAAGzceIQ3wmdwGupKcVXjw72xPFWOU",
  authDomain: "rawr-457ba.firebaseapp.com",
  projectId: "rawr-457ba",
  storageBucket: "rawr-457ba.appspot.com",
  messagingSenderId: "513110454154",
  appId: "1:513110454154:web:08c12de18d3a8de76f6273",
  measurementId: "G-YW15G7BZLS",
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const firestore = firebase.firestore();
export const createUserDocument = async (user) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  console.log(userRef);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    console.log(user.email);
    try {
      await userRef.set({
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log("Error in creating user", error);
    }
  }
};
