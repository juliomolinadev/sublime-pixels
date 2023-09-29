// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import { createDocOnFirestore } from "../../../src/firebase/firestoreCRUD/createDocOnFirestore";
import { addDoc } from "firebase/firestore";

const createError = new Error("Unable to create document");

vi.mock("firebase/firestore", async () => {
	const actual = await vi.importActual("firebase/firestore");
	return {
		...(actual as object),
		addDoc: vi.fn().mockImplementation(() => {
			throw createError;
		}),
	};
});

const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

describe("createDocOnFirestore() fail tests", () => {
	it("should return false when an error is thrown", async () => {
		const query = { collectionPath: "tests/createDoc/createSubcollection", document: {} };

		const createResp = await createDocOnFirestore(query);

		expect(addDoc).toHaveBeenCalled();
		expect(createResp).toBeFalsy();
		expect(consoleMock).toHaveBeenLastCalledWith(createError);
	});
});
