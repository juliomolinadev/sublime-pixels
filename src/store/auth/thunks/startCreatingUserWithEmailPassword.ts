import { registerUserWithEmailPassword } from "../../../firebase/firebaseProviders";
import { AppDispatch } from "../../store";
import { checkingCredentials, login, logout } from "../authSlice";

interface UserInRegister {
	email: string;
	password: string;
	displayName: string;
}

export const startCreatingUserWithEmailPassword = ({
	email,
	password,
	displayName,
}: UserInRegister) => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		// TODO: Use dinamic url by enviroment
		const redirectURL = "http://localhost:3000/";
		const result = await registerUserWithEmailPassword({
			email,
			password,
			displayName,
			redirectURL,
		});

		if (!result.ok) {
			dispatch(logout(result.authErrorMessage));
			return result;
		}

		dispatch(login(result));
		return result;
	};
};
