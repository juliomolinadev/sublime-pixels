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

const privateBatches = ["3", "4", "5"];
const publicBatches = ["3", "4"];

const batchArrayResponse: QueryDocumentSnapshot<DocumentData, DocumentData> = {
	metadata: <SnapshotMetadata>{},
	exists: () => {},
	get: () => {},
	id: "1",
	ref: <DocumentReference<DocumentData, DocumentData>>{},
	data: (): DocumentData => ({
		privateBatches,
		publicBatches,
	}),
};

describe("startSetBatchesArray thunk tests", () => {
	const dispatch = vi.fn();
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should call setBatchesArray and setActiveBatch with private batches (success)", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: [],
				dislikes: ["1"],
				userRole: "admin",
			},
		}));

		vi.mocked(readDocFromFirestore).mockResolvedValue(batchArrayResponse);

		const response = await startSetBatchesArray()(dispatch, getState);

		expect(dispatch).toHaveBeenNthCalledWith(1, setBatchesArray(privateBatches));
		expect(dispatch).toHaveBeenNthCalledWith(2, setActiveBatch(privateBatches[0]));
		expect(response).toBeTruthy();
	});

	it("should call setBatchesArray and setActiveBatch with public batches (success)", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: [],
				dislikes: ["1"],
				userRole: "user",
			},
		}));

		vi.mocked(readDocFromFirestore).mockResolvedValue(batchArrayResponse);

		const response = await startSetBatchesArray()(dispatch, getState);

		expect(dispatch).toHaveBeenNthCalledWith(1, setBatchesArray(publicBatches));
		expect(dispatch).toHaveBeenNthCalledWith(2, setActiveBatch(publicBatches[0]));
		expect(response).toBeTruthy();
	});

	it("should call switchLoadingState (fail)", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: [],
				dislikes: ["1"],
				userRole: "admin",
			},
		}));

		vi.mocked(readDocFromFirestore).mockResolvedValue(false);

		const success = await startSetBatchesArray()(dispatch, getState);

		expect(success).toBeFalsy();
	});
});
