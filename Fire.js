// 1.
import firebase from 'firebase'; 
const firebaseConfig = {
    apiKey: "<YOUR-API-KEY>",
    authDomain: "<YOUR-AUTH-DOMAIN>",
    databaseURL: "<YOUR-DATABASE-URL>",
    storageBucket: "<YOUR-STORAGE-BUCKET>"
};

export default class Fire {
    cdbh = null;
    // Initialize Firebase  
  
    constructor() {
        firebase.initializeApp(firebaseConfig);
        

    }

    getDB(){
        dbh = firebase.firestore();
        return dbh;
    }

   
}




