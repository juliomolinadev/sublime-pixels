// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import { readDocFromFirestore } from "../../../src/firebase/firestoreCRUD/readDocFromFirestore";
import { getDoc } from "firebase/firestore";

const readError = new Error("Unable to read document");

vi.mock("firebase/firestore", async () => {
	const actual = await vi.importActual("firebase/firestore");
	return {
		...(actual as object),
		getDoc: vi.fn().mockImplementation(() => {
			throw readError;
		}),
	};
});

const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

describe("readDocFromFirestore() tests", () => {
	it("should return false when an error is thrown", async () => {
		const query = { collectionPath: "tests/readDoc/readSubcollection", docId: "123" };
		const readResp = await readDocFromFirestore(query);

		expect(getDoc).toHaveBeenCalled();
		expect(readResp).toBeFalsy();
		expect(consoleMock).toHaveBeenLastCalledWith(readError);
	});
});
