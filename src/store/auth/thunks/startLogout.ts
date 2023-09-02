import { logoutFirebase } from "../../../firebase/firebaseProviders";
import { AppDispatch } from "../../store";
import { logout } from "../authSlice";

export const startLogout = () => {
	return async (dispatch: AppDispatch) => {
		await logoutFirebase();

		dispatch(logout(null));
	};
};
