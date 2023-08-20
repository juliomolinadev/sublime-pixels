import { checkingCredentials, login, logout } from ".";
import { AppDispatch } from "..";
import {
	loginUserWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
} from "../../firebase/firebaseProviders";

interface User {
	email: string;
	password: string;
	displayName?: string;
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: User) => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		const result = await registerUserWithEmailPassword({ email, password, displayName });

		if (!result.ok) {
			dispatch(logout(result.errorMessage));
			return result;
		}

		dispatch(login(result));
		return result;
	};
};

export const startLoginWithEmailPassword = ({ email, password }: User) => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		const result = await loginUserWithEmailPassword({ email, password });
		if (!result.ok) {
			dispatch(logout(result.errorMessage));
			return result;
		}

		dispatch(login(result));
		return result;
	};
};

export const startLogout = () => {
	return async (dispatch: AppDispatch) => {
		await logoutFirebase();

		dispatch(logout({}));
	};
};
