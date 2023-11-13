import { SweetAlertOptions } from "sweetalert2";
import { authResponsesMessages, uiErrorMessages } from "../../../assets/errorMessages";
import { registerUserWithEmailPassword } from "../../../firebase/firebaseProviders";
import { getEnvironments, messageAlert } from "../../../helpers";
import { AppDispatch } from "../../store";
import { setUiErrorMessage, switchRegisterModal } from "../../ui";
import { checkingCredentials, login, logout } from "../authSlice";
import { createDocOnFirestore } from "../../../firebase/firestoreCRUD";
import { setUser } from "../../user";

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

		const { VITE_REDIRECT_URL } = getEnvironments();

		const result = await registerUserWithEmailPassword({
			email,
			password,
			displayName,
			redirectURL: VITE_REDIRECT_URL,
		});

		if (!result.ok) {
			const { emailRegistered, networkError } = authResponsesMessages;

			const isNetworkError = result.authErrorMessage === networkError;

			if (!result.ok && isNetworkError) {
				dispatch(setUiErrorMessage(uiErrorMessages.networkError));
			}

			if (!result.ok && result.authErrorMessage === emailRegistered) {
				dispatch(setUiErrorMessage(uiErrorMessages.notAvailableEmailError));
			}

			dispatch(logout(result.authErrorMessage));
			return;
		}

		if (result.uid === null) return;

		const { uid } = result;
		const userInitialState = {
			uid,
			downloads: [],
			likes: [],
			dislikes: [],
		};

		const createUserQuery = {
			collectionPath: "users",
			docId: uid,
			document: {
				...userInitialState,
				displayName,
				email,
			},
		};

		const isUserCreated = await createDocOnFirestore(createUserQuery);

		const alert: SweetAlertOptions = {
			title: "Please verify your email address",
			text: "Check your inbox and follow the link.",
			icon: "warning",
		};

		if (isUserCreated) {
			messageAlert(alert);

			dispatch(setUser(userInitialState));
			dispatch(login(result));
			dispatch(switchRegisterModal());
		}
	};
};
