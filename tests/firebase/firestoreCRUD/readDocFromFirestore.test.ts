// @vitest-environment node

import { describe, expect, it } from "vitest";
import { readDocFromFirestore } from "../../../src/firebase/firestoreCRUD/readDocFromFirestore";

describe("readDocFromFirestore() tests", () => {
	it("should read a documents from firestore", async () => {
		const query = { collectionPath: "tests/readDoc/readSubcollection", docId: "123" };

		const readResp = await readDocFromFirestore(query);

		let isReadable = false;
		if (readResp) isReadable = readResp.data().isReadable;

		expect(readResp).toBeTruthy();
		expect(isReadable).toBeTruthy();
	});
});
