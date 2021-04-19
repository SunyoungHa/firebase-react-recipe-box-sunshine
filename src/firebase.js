import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyB8Uq3XmxtZVMBxU0TLfN7Lvt1YBDb8kyo",
authDomain: "react-firebase-recipe-box.firebaseapp.com",
projectId: "react-firebase-recipe-box",
storageBucket: "react-firebase-recipe-box.appspot.com",
messagingSenderId: "130333464182",
appId: "1:130333464182:web:755e0f96a3ffc9f2e6f157",
measurementId: "G-8KCW0H9N24"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
