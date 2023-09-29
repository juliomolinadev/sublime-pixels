// @vitest-environment node

import { describe, expect, it, vi } from "vitest";
import { readCollectionFromFirestore } from "../../../src/firebase/firestoreCRUD/readCollectionFromFirestore";
import { getDocs } from "firebase/firestore";

const readError = new Error("Unable to read documents");

vi.mock("firebase/firestore", async () => {
	const actual = await vi.importActual("firebase/firestore");
	return {
		...(actual as object),
		getDocs: vi.fn().mockImplementation(() => {
			throw readError;
		}),
	};
});

const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

describe("readCollectionFromFirestore() fail tests", () => {
	it("should return false when an error is thrown", async () => {
		const readResp = await readCollectionFromFirestore("/tests/readDoc/readSubcollection");

		expect(getDocs).toHaveBeenCalled();
		expect(readResp).toBeFalsy();
		expect(consoleMock).toHaveBeenLastCalledWith(readError);
	});
});
