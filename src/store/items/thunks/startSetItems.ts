import { DocumentData } from "firebase/firestore";
import { readCollectionFromFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch, RootState } from "../../store";
import { addItems, setCurrentItems } from "../itemsSlice";

export const startSetItems = (batchId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();

		if (state.batches.batches[batchId]) {
			dispatch(setCurrentItems(batchId));
			return true;
		} else {
			const itemsQuery = {
				collectionPath: "items",
				filters: {
					where: ["batch", "==", batchId],
				},
			};

			const itemsResponse = await readCollectionFromFirestore(itemsQuery);

			if (!itemsResponse) {
				return false;
			}

			const items = itemsResponse.map((item: DocumentData) => item.data());
			dispatch(addItems(items));

			return true;
		}
	};
};