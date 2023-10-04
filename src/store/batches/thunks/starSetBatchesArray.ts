import { readDocFromFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch } from "../../store";
import { switchLoadingState } from "../../ui";
import { setActiveBatch, setBatchesArray } from "../batchesSlice";

export const startSetBatchesArray = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(switchLoadingState());

		const readQuery = {
			collectionPath: "app",
			docId: "batches",
		};

		const response = await readDocFromFirestore(readQuery);

		if (!response) {
			dispatch(switchLoadingState());
			return false;
		}

		const batches = response.data().batches;
		batches.reverse();

		dispatch(setBatchesArray(batches));
		dispatch(setActiveBatch(batches[0]));
		dispatch(switchLoadingState());
		return true;
	};
};
