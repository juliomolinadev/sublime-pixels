import { readDocFromFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch, RootState } from "../../store";
import { setActiveBatch, setBatchesArray } from "../batchesSlice";

export const startSetBatchesArray = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { userRole } = state.user;

		const batchesArrayQuery = {
			collectionPath: "app",
			docId: "batches",
		};

		const batchesArrayResponse = await readDocFromFirestore(batchesArrayQuery);

		if (!batchesArrayResponse) {
			return false;
		}

		const batches =
			userRole === "admin"
				? batchesArrayResponse.data().privateBatches
				: batchesArrayResponse.data().publicBatches;

		batches.reverse();

		dispatch(setBatchesArray(batches));
		dispatch(setActiveBatch(batches[0]));

		return true;
	};
};
