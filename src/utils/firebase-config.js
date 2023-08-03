import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1D2l4MEdF5T-hgWB7nR9bkz1_59cFsFY",
  authDomain: "react-netflix-clone-2076e.firebaseapp.com",
  projectId: "react-netflix-clone-2076e",
  storageBucket: "react-netflix-clone-2076e.appspot.com",
  messagingSenderId: "760093324239",
  appId: "1:760093324239:web:f72387ed669ae8f6d358ba",
  measurementId: "G-RM37X3MQ3Y",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
