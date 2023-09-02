import { loginUserWithEmailPassword } from "../../../firebase/firebaseProviders";
import { AppDispatch } from "../../store";
import { setUiErrorMessage } from "../../ui";
import { checkingCredentials, login, logout } from "../authSlice";

interface UserInLogin {
	email: string;
	password: string;
}

export const startLoginWithEmailPassword = ({ email, password }: UserInLogin) => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		const result = await loginUserWithEmailPassword({ email, password });
		if (!result.ok) {
			const emailErrorMessage = "Firebase: Error (auth/user-not-found).";
			const passwordErrorMessage = "Firebase: Error (auth/wrong-password).";
			const networkErrorMessage = "Firebase: Error (auth/network-request-failed).";

			const isCredentialsError =
				result.authErrorMessage === emailErrorMessage ||
				result.authErrorMessage === passwordErrorMessage;

			const isNetworkError = result.authErrorMessage === networkErrorMessage;

			if (!result.ok && isNetworkError) {
				dispatch(
					setUiErrorMessage(
						"There is a network error, please check your connection or try again later.",
					),
				);
			}

			if (!result.ok && isCredentialsError) {
				dispatch(setUiErrorMessage("There is an error in your email or password"));
			}

			dispatch(logout(result.authErrorMessage));
			return result;
		}

		dispatch(login(result));
		return result;
	};
};
