import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch, RootState } from "../../store";
import { addDownload } from "../userSlice";
import { addDownload as incrementDownloads } from "../../items";

export const startAddDownload = (itemId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { uid, downloads } = state.user;

		if (!uid) return false;

		if (downloads.includes(itemId)) return false;

		const addQuery = {
			collectionPath: "users",
			docId: uid,
			updates: {},
			arrayUnionUpdate: { fieldName: "downloads", value: itemId },
		};

		const wasAdded = await updateDocInFirestore(addQuery);

		const incrementQuery = {
			collectionPath: "items",
			docId: itemId,
			updates: {},
			incrementUpdate: { fieldName: "downloads", amount: 1 },
		};

		const wasIncremented = await updateDocInFirestore(incrementQuery);

		if (wasAdded && wasIncremented) {
			dispatch(addDownload(itemId));
			dispatch(incrementDownloads(itemId));
		}

		return wasAdded;
	};
};
