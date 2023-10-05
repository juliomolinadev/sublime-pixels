import { readDocFromFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch } from "../../store";
import { setActiveBatch, setBatchesArray } from "../batchesSlice";

export const startSetBatchesArray = () => {
	return async (dispatch: AppDispatch) => {
		const batchesArrayQuery = {
			collectionPath: "app",
			docId: "batches",
		};

		const batchesArrayResponse = await readDocFromFirestore(batchesArrayQuery);

		if (!batchesArrayResponse) {
			return false;
		}

		const batches = batchesArrayResponse.data().batches;
		batches.reverse();

		dispatch(setBatchesArray(batches));
		dispatch(setActiveBatch(batches[0]));

		return true;
	};
};
