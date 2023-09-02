import { signInWithGoogle } from "../../../firebase/firebaseProviders";
import { AppDispatch } from "../../store";
import { checkingCredentials, login, logout } from "../authSlice";

export const startGoogleSignIn = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		const result = await signInWithGoogle();
		if (!result.ok) {
			dispatch(logout(null));
			return result;
		}

		dispatch(login(result));
		return result;
	};
};
