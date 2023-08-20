import { checkingCredentials, login, logout } from ".";
import { AppDispatch } from "..";
import { registerUserWithEmailPassword } from "../../firebase/firebaseProviders";

interface User {
	email: string;
	password: string;
	displayName: string;
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
