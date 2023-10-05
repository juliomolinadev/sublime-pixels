import { readDocFromFirestore } from "../../../firebase/firestoreCRUD";
import { BatchesProps } from "../../interfaces";
import { AppDispatch } from "../../store";
import { addBatch } from "../batchesSlice";

export const startAddBatch = (batchId: string) => {
	return async (dispatch: AppDispatch) => {
		const batchQuery = {
			collectionPath: "batches",
			docId: batchId,
		};

		const batchResponse = await readDocFromFirestore(batchQuery);

		if (!batchResponse) {
			return false;
		}

		const batch = batchResponse.data();

		dispatch(addBatch(batch as BatchesProps));

		return true;
	};
};
