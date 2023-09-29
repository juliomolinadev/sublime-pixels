// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import { deleteDocOnFirestore } from "../../../src/firebase/firestoreCRUD/deleteDocOnFirestore";
import { deleteDoc } from "firebase/firestore";

const deleteError = new Error("Unable delete document");

vi.mock("firebase/firestore", async () => {
	const actual = await vi.importActual("firebase/firestore");
	return {
		...(actual as object),
		deleteDoc: vi.fn().mockImplementation(() => {
			throw deleteError;
		}),
	};
});

const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

describe("deleteDocOnFirestore() fail tests", () => {
	it("should return false when an error is thrown", async () => {
		const deleteQuery = {
			collectionPath: "x",
			docId: "deletable",
		};

		const deleteResp = await deleteDocOnFirestore(deleteQuery);

		expect(deleteDoc).toHaveBeenCalled();
		expect(deleteResp).toBeFalsy();
		expect(consoleMock).toHaveBeenLastCalledWith(deleteError);
	});
});
