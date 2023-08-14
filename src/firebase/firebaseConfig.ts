// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	// updateProfile,
	// onAuthStateChanged,
	signOut,
	// updatePassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPID,
	measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

const firebaseRegister = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

const firebaseLogin = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

const firebaseLogout = () => {
	return signOut(auth);
};

// const firebaseCheckIsLoggedIn = (actions) => {
// 	return onAuthStateChanged(auth, actions);
// };

// const firebaseUpdateUser = (userUpdates) => {
// 	return updateProfile(auth.currentUser, userUpdates);
// };

// const firebaseUpdatePassword = (password: string) => {
// 	return updatePassword(auth.currentUser, password);
// };

export {
	app,
	db,
	storage,
	firebaseRegister,
	firebaseLogin,
	firebaseLogout,
	// firebaseUpdateUser,
	// firebaseCheckIsLoggedIn,
	// firebaseUpdatePassword,
};
