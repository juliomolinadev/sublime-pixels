import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch, RootState } from "../../store";
import { addLike, removeLike } from "../userSlice";

export const startSwitchLike = (itemId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { uid, likes } = state.user;

		if (!uid) return false;

		if (likes.includes(itemId)) {
			const removeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "likes", value: itemId },
			};

			const wasRemoved = await updateDocInFirestore(removeQuery);

			if (wasRemoved) dispatch(removeLike(itemId));
			return wasRemoved;
		} else {
			const addQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "likes", value: itemId },
			};

			const wasAdded = await updateDocInFirestore(addQuery);

			if (wasAdded) dispatch(addLike(itemId));
			return wasAdded;
		}
	};
};
