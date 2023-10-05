import { beforeEach, describe, expect, it, vi } from "vitest";
import { readDocFromFirestore } from "../../../../src/firebase/firestoreCRUD/readDocFromFirestore";
import { startSetBatchesArray } from "../../../../src/store/batches/thunks/starSetBatchesArray";
import { setActiveBatch, setBatchesArray } from "../../../../src/store/batches";
import {
	DocumentData,
	DocumentReference,
	QueryDocumentSnapshot,
	SnapshotMetadata,
} from "firebase/firestore";

vi.mock("../../../../src/firebase/firestoreCRUD/readDocFromFirestore");

const batchesArray = ["3", "4", "5"];

const batchArrayResponse: QueryDocumentSnapshot<DocumentData, DocumentData> = {
	metadata: <SnapshotMetadata>{},
	exists: () => {},
	get: () => {},
	id: "1",
	ref: <DocumentReference<DocumentData, DocumentData>>{},
	data: (): DocumentData => ({
		batches: batchesArray,
	}),
};

describe("startSetBatchesArray thunk tests", () => {
	const dispatch = vi.fn();
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should call setBatchesArray and setActiveBatch (success)", async () => {
		vi.mocked(readDocFromFirestore).mockResolvedValue(batchArrayResponse);

		const response = await startSetBatchesArray()(dispatch);

		expect(dispatch).toHaveBeenNthCalledWith(1, setBatchesArray(batchesArray));
		expect(dispatch).toHaveBeenNthCalledWith(2, setActiveBatch(batchesArray[0]));
		expect(response).toBeTruthy();
	});

	it("should call switchLoadingState (fail)", async () => {
		vi.mocked(readDocFromFirestore).mockResolvedValue(false);

		const success = await startSetBatchesArray()(dispatch);

		expect(success).toBeFalsy();
	});
});
