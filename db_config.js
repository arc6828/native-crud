import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwCRYbju1Mp_QzZglU5F25NW5p-R3QBMk",
    authDomain: "native-f2c37.firebaseapp.com",
    databaseURL: "https://native-f2c37.firebaseio.com",
    projectId: "native-f2c37",
    storageBucket: "native-f2c37.appspot.com",
    messagingSenderId: "887454953823",
    appId: "1:887454953823:web:c3f471d967400e830ac6ea",
    measurementId: "G-Q3YQDVZ4S0"
};  // apiKey, authDomain, etc. (see above)

firebase.initializeApp(firebaseConfig);
//var db = firebase.firestore();
/*
const dbh = firebase.firestore();

dbh.collection("characters").doc("mario").set({
  employment: "plumber",
  outfitColor: "red",
  specialAttack: "fireball"
})
*/