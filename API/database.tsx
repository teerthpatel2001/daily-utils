import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC6LtxJHd0YQtaFcsIa6lSV0Hkugy-Rtlk",
//   authDomain: "dailyutils2.firebaseapp.com",
//   projectId: "dailyutils2",
//   storageBucket: "dailyutils2.appspot.com",
//   messagingSenderId: "738886032617",
//   appId: "1:738886032617:web:ffa3e58e4de042414c6478",
//   measurementId: "G-Q0T1YH01PG",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCMLgx6sdSEty413liaBASkkAfYmKMOVII",
  authDomain: "daily-utils-3.firebaseapp.com",
  projectId: "daily-utils-3",
  storageBucket: "daily-utils-3.appspot.com",
  messagingSenderId: "249678447104",
  appId: "1:249678447104:web:daa9230c539c87268fcee5",
  measurementId: "G-CV5E92KSDT",
};

const App = initializeApp(firebaseConfig);
const Database = getFirestore(App);
const Auth = getAuth(App);

export default Database;
export { Auth };
