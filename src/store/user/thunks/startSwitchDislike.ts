import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch, RootState } from "../../store";
import { addDislike, removeDislike } from "../userSlice";

export const startSwitchDislike = (itemId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { uid, dislikes } = state.user;

		if (!uid) return false;

		if (dislikes.includes(itemId)) {
			const removeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasRemoved = await updateDocInFirestore(removeQuery);

			if (wasRemoved) dispatch(removeDislike(itemId));
			return wasRemoved;
		} else {
			const addQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasAdded = await updateDocInFirestore(addQuery);

			if (wasAdded) dispatch(addDislike(itemId));
			return wasAdded;
		}
	};
};
