import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { FirebaseAuth } from "../firebase/firebaseConfig";
import { login, logout } from "../store/auth";
import { useTypedDispatch, useTypedSelector } from ".";

export const useCheckAuth = () => {
	const { status } = useTypedSelector((state) => state.auth);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout(""));

			const { uid, email, displayName, photoURL } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
		});
	}, [dispatch]);

	return status;
};
