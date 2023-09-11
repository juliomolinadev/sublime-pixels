import { authResponsesMessages, uiErrorMessages } from "../../../assets/errorMessages";
import { loginUserWithEmailPassword } from "../../../firebase/firebaseProviders";
import { AppDispatch } from "../../store";
import { setUiErrorMessage, switchLoginModal } from "../../ui";
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
			const { emailError, passwordError, networkError } = authResponsesMessages;

			const isCredentialsError =
				result.authErrorMessage === emailError || result.authErrorMessage === passwordError;

			const isNetworkError = result.authErrorMessage === networkError;

			if (!result.ok && isNetworkError) {
				dispatch(setUiErrorMessage(uiErrorMessages.networkError));
			}

			if (!result.ok && isCredentialsError) {
				dispatch(setUiErrorMessage(uiErrorMessages.credentialError));
			}

			dispatch(logout(result.authErrorMessage));
			return result;
		}

		dispatch(login(result));
		dispatch(switchLoginModal());
		return result;
	};
};
