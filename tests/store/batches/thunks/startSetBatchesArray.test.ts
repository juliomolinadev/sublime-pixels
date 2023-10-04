import { SnapshotData, beforeEach, describe, expect, it, vi } from "vitest";
import { readDocFromFirestore } from "../../../../src/firebase/firestoreCRUD/readDocFromFirestore";
import { startSetBatchesArray } from "../../../../src/store/batches/thunks/starSetBatchesArray";
import { switchLoadingState } from "../../../../src/store/ui";
import { setActiveBatch, setBatchesArray } from "../../../../src/store/batches";
import {
	DocumentData,
	DocumentReference,
	QueryDocumentSnapshot,
	SnapshotMetadata,
} from "firebase/firestore";

vi.mock("../../../../src/firebase/firestoreCRUD/readDocFromFirestore");

describe("startSetBatchesArray thunk tests", () => {
	const dispatch = vi.fn();
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should call switchLoadingState and setBatchesArray (success)", async () => {
		const batchesArray = ["3", "4", "5"];
		batchesArray.reverse();

		const response: QueryDocumentSnapshot<DocumentData, DocumentData> = {
			metadata: <SnapshotMetadata>{},
			exists: () => {},
			get: () => {},
			id: "1",
			ref: <DocumentReference<DocumentData, DocumentData>>{},
			data: (): DocumentData => ({
				batches: batchesArray,
			}),
		};

		vi.mocked(readDocFromFirestore).mockResolvedValue(response);

		const success = await startSetBatchesArray()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(switchLoadingState());
		expect(dispatch).toHaveBeenCalledWith(setActiveBatch(batchesArray[0]));
		expect(dispatch).toHaveBeenCalledWith(setBatchesArray(batchesArray));
		expect(success).toBeTruthy();
	});

	it("should call switchLoadingState (fail)", async () => {
		vi.mocked(readDocFromFirestore).mockResolvedValue(false);

		const success = await startSetBatchesArray()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(switchLoadingState());
		expect(success).toBeFalsy();
	});
});
