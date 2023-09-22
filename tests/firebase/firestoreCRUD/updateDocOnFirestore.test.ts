// @vitest-environment node

import { describe, expect, it } from "vitest";
import { createDocOnFirestore } from "../../../src/firebase/firestoreCRUD/createDocOnFirestore";
import { updateDocInFirestore } from "../../../src/firebase/firestoreCRUD/updateDocOnFirestore";
import { readDocFromFirestore } from "../../../src/firebase/firestoreCRUD/readDocFromFirestore";

describe("updateDocOnFirestore() tests", () => {
	it("should create and update a document on firestore", async () => {
		const document = { id: "updatable", name: "test" };
		const query = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable",
			document,
		};

		const success = await createDocOnFirestore(query);

		const updates = { name: "test updated" };
		const updateQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable",
			updates,
		};
		const updateSuccess = await updateDocInFirestore(updateQuery);

		const readQuery = { collectionPath: "tests/createDoc/createSubcollection", docId: "updatable" };
		const resp = await readDocFromFirestore(readQuery);

		let name = "";
		if (resp) name = resp.data().name;

		expect(success).toBeTruthy();
		expect(updateSuccess).toBeTruthy();
		expect(name).toBe("test updated");
	});
});
