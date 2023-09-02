import { SweetAlertOptions } from "sweetalert2";
import { checkingCredentials, login, logout } from ".";
import { AppDispatch } from "..";
import {
	loginUserWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	resendEmailVerification,
	signInWithGoogle,
} from "../../firebase/firebaseProviders";
import { messageAlert } from "../../helpers";
import { setUiErrorMessage, switchLoadingState } from "../ui";

export const checkingAuthentication = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());
	};
};

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

export const startLogout = () => {
	return async (dispatch: AppDispatch) => {
		await logoutFirebase();

		dispatch(logout(null));
	};
};

export const startResendEmailVerification = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(switchLoadingState());

		// TODO: Use dinamic url by enviroment
		const redirectURL = "http://localhost:3000/";
		await resendEmailVerification(redirectURL);
		dispatch(switchLoadingState());

		// TODO: Send this alert to the component that uses it
		const alert: SweetAlertOptions = {
			title: "Verification email has been resent.",
			text: "Please check your inbox and spam folder.",
			icon: "success",
		};

		messageAlert(alert);
	};
};
