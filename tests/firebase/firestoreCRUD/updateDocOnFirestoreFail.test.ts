// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import { updateDocInFirestore } from "../../../src/firebase/firestoreCRUD/updateDocOnFirestore";
import { updateDoc } from "firebase/firestore";

const updateError = new Error("Unable to update document");

vi.mock("firebase/firestore", async () => {
	const actual = await vi.importActual("firebase/firestore");
	return {
		...(actual as object),
		updateDoc: vi.fn().mockImplementation(() => {
			throw updateError;
		}),
	};
});

const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

describe("updateDocOnFirestore() tests", () => {
	it("should return false when an error is thrown", async () => {
		const updateQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable",
			updates: {},
		};
		const updateResp = await updateDocInFirestore(updateQuery);

		expect(updateDoc).toHaveBeenCalled();
		expect(updateResp).toBeFalsy();
		expect(consoleMock).toHaveBeenLastCalledWith(updateError);
	});
});
