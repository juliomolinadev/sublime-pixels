// @vitest-environment node

import { describe, expect, it } from "vitest";
import { createDocOnFirestore } from "../../../src/firebase/firestoreCRUD/createDocOnFirestore";
import { updateDocInFirestore } from "../../../src/firebase/firestoreCRUD/updateDocOnFirestore";
import { readDocFromFirestore } from "../../../src/firebase/firestoreCRUD/readDocFromFirestore";

describe("updateDocOnFirestore() tests", () => {
	it("should create and update a document on firestore", async () => {
		const document = { id: "updatable", name: "test" };
		const createQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable",
			document,
		};

		const createResp = await createDocOnFirestore(createQuery);

		const updates = { name: "test updated" };
		const updateQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable",
			updates,
		};
		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = { collectionPath: "tests/createDoc/createSubcollection", docId: "updatable" };
		const readResp = await readDocFromFirestore(readQuery);

		let name = "";
		if (readResp) name = readResp.data().name;

		expect(createResp).toBeTruthy();
		expect(updateResp).toBeTruthy();
		expect(name).toBe("test updated");
	});
});
