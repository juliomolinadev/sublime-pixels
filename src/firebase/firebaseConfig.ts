import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getEnvironments } from "../helpers";

const {
	VITE_APIKEY,
	VITE_AUTHDOMAIN,
	VITE_PROJECTID,
	VITE_STORAGEBUCKET,
	VITE_MESSAGINGSENDERID,
	VITE_APPID,
	VITE_MEASUREMENTID,
} = getEnvironments();

// console.log(VITE_PROJECTID);
// console.log(`.env.${process.env.NODE_ENV}`);

const firebaseConfig = {
	apiKey: VITE_APIKEY,
	authDomain: VITE_AUTHDOMAIN,
	projectId: VITE_PROJECTID,
	storageBucket: VITE_STORAGEBUCKET,
	messagingSenderId: VITE_MESSAGINGSENDERID,
	appId: VITE_APPID,
	measurementId: VITE_MEASUREMENTID,
};

const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const FirebaseDB = getFirestore(FirebaseApp);
const FirebaseStorage = getStorage(FirebaseApp);

export { FirebaseApp, FirebaseAuth, FirebaseDB, FirebaseStorage };
