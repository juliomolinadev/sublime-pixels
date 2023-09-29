// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import { writeBatch } from "firebase/firestore";
import { createBatchOnFirestore } from "../../../src/firebase/firestoreCRUD/createBatchOnFirestore";

const createError = new Error("Unable to create batch");

vi.mock("firebase/firestore", async () => {
	const actual = await vi.importActual("firebase/firestore");
	return {
		...(actual as object),
		writeBatch: vi.fn().mockImplementation(() => {
			throw createError;
		}),
	};
});

const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

describe("createBatchOnFirestore() fail tests", () => {
	it("should return false when an error is thrown", async () => {
		const query = { collectionPath: "tests/createDoc/createSubcollection", data: [] };

		const createResp = await createBatchOnFirestore(query);

		expect(writeBatch).toHaveBeenCalled();
		expect(createResp).toBeFalsy();
		expect(consoleMock).toHaveBeenLastCalledWith(createError);
	});
});
