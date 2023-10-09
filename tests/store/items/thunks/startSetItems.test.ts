import { beforeEach, describe, expect, it, vi } from "vitest";
import { DocumentData, DocumentReference, SnapshotMetadata } from "firebase/firestore";

import { readCollectionFromFirestore } from "../../../../src/firebase/firestoreCRUD";
import { addItems, setCurrentItems, startSetItems } from "../../../../src/store/items";
import { newTestItems } from "../../../fixtures/itemsFixtures";

vi.mock("../../../../src/firebase/firestoreCRUD");

const itemsResponse = newTestItems.map((item) => ({
	metadata: <SnapshotMetadata>{},
	exists: () => {},
	get: () => {},
	id: "1",
	ref: <DocumentReference<DocumentData, DocumentData>>{},
	data: (): DocumentData => item,
}));

describe("startSetItems thunk tests", () => {
	const dispatch = vi.fn();
	const getState = vi.fn().mockImplementation(() => ({
		batches: {
			batches: {
				"1": {
					downloadables: 2,
					id: "1",
					name: "Hello World",
				},
			},
		},
	}));

	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should call setCurrentItems if batch items already are in the store", async () => {
		const response = await startSetItems("1")(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(setCurrentItems("1"));
		expect(response).toBeTruthy();
	});

	it("should call addItems if batch items aren't in the store yet", async () => {
		vi.mocked(readCollectionFromFirestore).mockResolvedValue(itemsResponse);

		const response = await startSetItems("2")(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(addItems(newTestItems));
		expect(response).toBeTruthy();
	});

	it("should return false (fail)", async () => {
		vi.mocked(readCollectionFromFirestore).mockResolvedValue(false);

		const response = await startSetItems("2")(dispatch, getState);

		expect(response).toBeFalsy();
	});
});
