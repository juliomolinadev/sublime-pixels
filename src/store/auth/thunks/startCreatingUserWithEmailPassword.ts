import { SweetAlertOptions } from "sweetalert2";
import { authResponsesMessages } from "../../../assets/errorMessages";
import { registerUserWithEmailPassword } from "../../../firebase/firebaseProviders";
import { messageAlert } from "../../../helpers";
import { AppDispatch } from "../../store";
import { setUiErrorMessage, switchRegisterModal } from "../../ui";
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
			const { emailRegistered, networkError } = authResponsesMessages;

			const isNetworkError = result.authErrorMessage === networkError;

			if (!result.ok && isNetworkError) {
				dispatch(
					setUiErrorMessage(
						"There is a network error, please check your connection or try again later.",
					),
				);
			}

			if (!result.ok && result.authErrorMessage === emailRegistered) {
				dispatch(setUiErrorMessage("The email is already registered"));
			}

			dispatch(logout(result.authErrorMessage));
			return;
		}

		const alert: SweetAlertOptions = {
			title: "Please verify your email address",
			text: "Check your inbox and follow the link.",
			icon: "warning",
		};

		messageAlert(alert);

		dispatch(login(result));
		dispatch(switchRegisterModal());
	};
};
