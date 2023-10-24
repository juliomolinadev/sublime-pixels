import { AppDispatch } from "../../store";
import { readDocFromFirestore } from "../../../firebase/firestoreCRUD";
import { setUser } from "../userSlice";

export const startSetUser = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		const userQuery = {
			collectionPath: "users",
			docId: userId,
		};
		const userResponse = await readDocFromFirestore(userQuery);

		if (!userResponse) return false;

		const user = {
			uid: userId,
			downloads: userResponse.data().downloads,
			likes: userResponse.data().likes,
			dislikes: userResponse.data().dislikes,
		};

		dispatch(setUser(user));

		return true;
	};
};
