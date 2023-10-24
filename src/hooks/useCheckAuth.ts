import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { FirebaseAuth } from "../firebase/firebaseConfig";
import { login, logout } from "../store/auth";
import { useTypedDispatch, useTypedSelector } from ".";
import { startSetUser } from "../store/user/thunks";

export const useCheckAuth = () => {
	const { status } = useTypedSelector((state) => state.auth);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout(""));

			const { uid, email, displayName, photoURL, emailVerified } = user;
			dispatch(login({ uid, email, displayName, photoURL, emailVerified }));
			dispatch(startSetUser(uid));
		});
	}, [dispatch]);

	return status;
};
