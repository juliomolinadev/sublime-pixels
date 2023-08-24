import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./firebaseConfig";

interface UserInRegister {
	email: string;
	password: string;
	displayName: string;
	redirectURL: string; //url to redirect after verifying email
}

export const registerUserWithEmailPassword = async ({
	email,
	password,
	displayName,
	redirectURL,
}: UserInRegister) => {
	try {
		const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL, emailVerified } = resp.user;

		if (!FirebaseAuth.currentUser) throw new Error("Null current user");

		await updateProfile(FirebaseAuth.currentUser, { displayName });

		if (redirectURL) await sendEmailVerification(FirebaseAuth.currentUser, { url: redirectURL });

		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
			errorMessage: null,
			emailVerified,
		};
	} catch (error) {
		const resp = {
			ok: false,
			errorMessage: "",
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			emailVerified: false,
		};

		if (typeof error === "string") {
			resp.errorMessage = error;
		}

		if (error instanceof Error) {
			resp.errorMessage = error.message;
		}

		return resp;
	}
};

interface UserInLogin {
	email: string;
	password: string;
}

export const loginUserWithEmailPassword = async ({ email, password }: UserInLogin) => {
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
			errorMessage: null,
		};
	} catch (error) {
		const resp = {
			ok: false,
			errorMessage: "",
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			emailVerified: false,
		};

		if (typeof error === "string") {
			resp.errorMessage = error;
		}

		if (error instanceof Error) {
			resp.errorMessage = error.message;
		}

		return resp;
	}
};

export const logoutFirebase = async () => {
	return await FirebaseAuth.signOut();
};

export const resendEmailVerification = async (redirectURL: string) => {
	try {
		if (!FirebaseAuth.currentUser) throw new Error("Null current user");
		return await sendEmailVerification(FirebaseAuth.currentUser, { url: redirectURL });
	} catch (error) {
		if (typeof error === "string") {
			console.log(error);
		}

		if (error instanceof Error) {
			console.log(error.message);
		}
	}
};
