import { SweetAlertOptions } from "sweetalert2";
import { checkingCredentials, login, logout } from ".";
import { AppDispatch } from "..";
import {
	loginUserWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	resendEmailVerification,
} from "../../firebase/firebaseProviders";
import { messageAlert } from "../../helpers";
import { switchLoadingState } from "../ui";

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
			dispatch(logout(result.errorMessage));
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

		const alert: SweetAlertOptions = {
			title: "Verification email has been resent.",
			text: "Please check your inbox and spam folder.",
			icon: "success",
		};

		messageAlert(alert);
	};
};
