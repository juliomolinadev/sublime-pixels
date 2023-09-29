// @vitest-environment node

import { describe, expect, it } from "vitest";
import { createDocOnFirestore } from "../../../src/firebase/firestoreCRUD/createDocOnFirestore";
import { updateDocInFirestore } from "../../../src/firebase/firestoreCRUD/updateDocOnFirestore";
import { readDocFromFirestore } from "../../../src/firebase/firestoreCRUD/readDocFromFirestore";

describe("updateDocOnFirestore() tests", () => {
	it("should create and update a document on firestore", async () => {
		const document = { id: "updatable1", name: "test", testArray: ["testString1"] };
		const createQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable1",
			document,
		};

		const createResp = await createDocOnFirestore(createQuery);

		const updates = { name: "test updated" };
		const updateQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable1",
			updates,
		};
		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable1",
		};
		const readResp = await readDocFromFirestore(readQuery);

		let name = "";
		if (readResp) name = readResp.data().name;

		expect(createResp).toBeTruthy();
		expect(updateResp).toBeTruthy();
		expect(name).toBe("test updated");
	});

	it("should update an array on a document on firestore with arrayUnion", async () => {
		const document = { id: "updatable2", name: "test", testArray: ["testString1"] };
		const createQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable2",
			document,
		};

		const createResp = await createDocOnFirestore(createQuery);

		const updateQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable2",
			updates: {},
			arrayUnionUpdate: { fieldName: "testArray", value: "testString2" },
		};
		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable2",
		};
		const readResp = await readDocFromFirestore(readQuery);

		let testArray: string[] = [];
		if (readResp) testArray = readResp.data().testArray;

		expect(createResp).toBeTruthy();
		expect(updateResp).toBeTruthy();
		expect(readResp).toBeTruthy();
		expect(testArray).toContain("testString2");
	});

	it("should update an array on a document on firestore with arrayRemove", async () => {
		const document = { id: "updatable3", name: "test", testArray: ["testString1", "testString2"] };
		const createQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable3",
			document,
		};

		const createResp = await createDocOnFirestore(createQuery);

		const updateQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable3",
			updates: {},
			arrayRemoveUpdate: { fieldName: "testArray", value: "testString2" },
		};
		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "updatable3",
		};
		const readResp = await readDocFromFirestore(readQuery);

		let testArray: string[] = [];
		if (readResp) testArray = readResp.data().testArray;

		expect(createResp).toBeTruthy();
		expect(updateResp).toBeTruthy();
		expect(readResp).toBeTruthy();
		expect(testArray).not.toContain("testString2");
	});
});
