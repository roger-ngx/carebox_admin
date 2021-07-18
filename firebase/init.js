//https://firebase.google.com/docs/web/setup?authuser=0
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDF0A14XhRs4aPk-UO4ySdAG3EaLvLLLD0",
    authDomain: "carebox-263b9.firebaseapp.com",
    projectId: "carebox-263b9",
    storageBucket: "carebox-263b9.appspot.com",
    messagingSenderId: "483145928892",
    appId: "1:483145928892:web:8bc4c145900e8e8be300b9",
    measurementId: "G-JBR2FBKWDJ"
};
// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

export default firebase;