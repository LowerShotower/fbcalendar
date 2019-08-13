import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { } from "@react-firebase/auth";

export const fbConfig = {
  apiKey: "AIzaSyALMENJaaVctZGemQ4gzws3e3Ql6PuFseY",
  authDomain: "fir-calendar-532bc.firebaseapp.com",
  databaseURL: "https://fir-calendar-532bc.firebaseio.com",
  projectId: "fir-calendar-532bc",
  storageBucket: "fir-calendar-532bc.appspot.com",
  messagingSenderId: "80682829542",
  appId: "1:80682829542:web:bb9fd1f47bd19bce"
};

export const rrfConfig = {
  useFirestoreForProfile: true,
  userProfile: 'users',
  attachAuthIsReady: true
};

firebase.initializeApp(fbConfig);

export const fbStore = firebase.firestore();


export const fbAuth = firebase.auth();

export default firebase;

