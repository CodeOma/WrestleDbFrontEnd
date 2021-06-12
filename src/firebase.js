import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const app = firebase.initializeApp({
//   apiKey: "AIzaSyBL8nsWGFcj8qBe70OQYCfN25FykRdMPGY",
//   authDomain: "wrestling-stats.firebaseapp.com",
//   databaseURL: "https://wrestling-stats-default-rtdb.firebaseio.com",
//   projectId: "wrestling-stats",
//   storageBucket: "wrestling-stats.appspot.com",
//   messagingSenderId: "623977862518",
//   appId: "1:623977862518:web:12acdb36aa08f8fc791657",
//   measurementId: "G-1PZ81R4GGF",
// });
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
console.log({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});
export const getIdToken = async () => {
  try {
    const getToken = await app.auth().currentUser.getIdToken();
    return getToken;
  } catch (e) {
    console.log(e);
  }
};

export const auth = app.auth();
export default app;

// import { getAuth, signInWithCustomToken } from "firebase/auth";

// firebase.auth().signInWithCustomToken(token)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

// const auth = getAuth();
// signInWithCustomToken(auth, token)
//   .then(userCredential => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch(error => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ...
//   });
