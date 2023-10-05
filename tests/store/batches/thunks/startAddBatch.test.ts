import { beforeEach, describe, expect, it, vi } from "vitest";
import { readDocFromFirestore } from "../../../../src/firebase/firestoreCRUD/readDocFromFirestore";
import { startSetBatchesArray } from "../../../../src/store/batches/thunks/starSetBatchesArray";
import { addBatch } from "../../../../src/store/batches";
import { startAddBatch } from "../../../../src/store/batches/thunks/startAddBatch";
import {
	DocumentData,
	DocumentReference,
	QueryDocumentSnapshot,
	SnapshotMetadata,
} from "firebase/firestore";

vi.mock("../../../../src/firebase/firestoreCRUD/readDocFromFirestore");

const newBatch = {
	downloadables: 2,
	id: "2",
	name: "Hello World",
};

const batchResponse: QueryDocumentSnapshot<DocumentData, DocumentData> = {
	metadata: <SnapshotMetadata>{},
	exists: () => {},
	get: () => {},
	id: "1",
	ref: <DocumentReference<DocumentData, DocumentData>>{},
	data: (): DocumentData => newBatch,
};

describe("startAddBatch thunk tests", () => {
	const dispatch = vi.fn();
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should call, addBatch (success)", async () => {
		vi.mocked(readDocFromFirestore).mockResolvedValue(batchResponse);

		const response = await startAddBatch("2")(dispatch);

		expect(dispatch).toHaveBeenCalledWith(addBatch(newBatch));
		expect(response).toBeTruthy();
	});

	it("should call switchLoadingState (fail)", async () => {
		vi.mocked(readDocFromFirestore).mockResolvedValue(false);

		const response = await startSetBatchesArray()(dispatch);

		expect(response).toBeFalsy();
	});
});
