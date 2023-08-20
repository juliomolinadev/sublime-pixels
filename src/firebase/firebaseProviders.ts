import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./firebaseConfig";

interface User {
	email: string;
	password: string;
	displayName?: string;
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }: User) => {
	try {
		const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL } = resp.user;

		if (!FirebaseAuth.currentUser) throw new Error("Null current user");

		await updateProfile(FirebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
			errorMessage: "",
		};
	} catch (error) {
		const resp = {
			ok: false,
			errorMessage: "",
		};

		if (typeof error === "string") {
			console.log(error);
			resp.errorMessage = error;
		}

		if (error instanceof Error) {
			console.log(error.message);
			resp.errorMessage = error.message;
		}

		return resp;
	}
};

export const loginUserWithEmailPassword = async ({ email, password }: User) => {
	try {
		const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL, displayName, emailVerified } = resp.user;

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
			emailVerified,
			errorMessage: "",
		};
	} catch (error) {
		const resp = {
			ok: false,
			errorMessage: "",
		};

		if (typeof error === "string") {
			console.log(error);
			resp.errorMessage = error;
		}

		if (error instanceof Error) {
			console.log(error.message);
			resp.errorMessage = error.message;
		}

		return resp;
	}
};

export const logoutFirebase = async () => {
	return await FirebaseAuth.signOut();
};
