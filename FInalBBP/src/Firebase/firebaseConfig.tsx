import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkJqqmTor04IoSNHmzkfpXNrzWDuO3dgo",
  authDomain: "bookborrowing-d38ea.firebaseapp.com",
  projectId: "bookborrowing-d38ea",
  storageBucket: "bookborrowing-d38ea.appspot.com",
  messagingSenderId: "646235089378",
  appId: "1:646235089378:web:3eb80119023e3d157a71bb",
  measurementId: "G-WF2CCZB3E6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebaseApp = app;
export { app, auth };
