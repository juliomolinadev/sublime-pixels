import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch, RootState } from "../../store";
import { decrementFreeDownloads } from "../userSlice";

export const startDecrementDownloadsCounter = (itemId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { uid, downloads } = state.user;

		if (!uid) return false;

		if (downloads.includes(itemId)) return false;

		const decrementQuery = {
			collectionPath: "users",
			docId: uid,
			updates: {},
			incrementUpdate: { fieldName: "freeDownloads", amount: -1 },
		};

		const wasDecremented = await updateDocInFirestore(decrementQuery);

		if (wasDecremented) {
			dispatch(decrementFreeDownloads());
		}

		return wasDecremented;
	};
};
