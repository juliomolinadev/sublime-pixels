import { SweetAlertOptions } from "sweetalert2";
import { resendEmailVerification } from "../../../firebase/firebaseProviders";
import { AppDispatch } from "../../store";
import { switchLoadingState } from "../../ui";
import { getEnvironments, messageAlert } from "../../../helpers";

export const startResendEmailVerification = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(switchLoadingState());

		const { VITE_REDIRECT_URL } = getEnvironments();

		await resendEmailVerification(VITE_REDIRECT_URL);
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
