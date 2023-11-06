// @vitest-environment node

import { describe, expect, it } from "vitest";
import { updateDocInFirestore } from "../../../src/firebase/firestoreCRUD/updateDocOnFirestore";
import { readDocFromFirestore } from "../../../src/firebase/firestoreCRUD/readDocFromFirestore";

describe("updateDocOnFirestore() tests", () => {
	it("should create and update a document on firestore", async () => {
		const randomNumber = new Date().getTime();

		const updates = { testNumber: randomNumber };
		const updateQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable1",
			updates,
		};
		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable1",
		};
		const readResp = await readDocFromFirestore(readQuery);

		let testNumber = "";
		if (readResp) testNumber = readResp.data().testNumber;

		expect(updateResp).toBeTruthy();
		expect(testNumber).toBe(randomNumber);
	});

	it("should update an array on a document on firestore with arrayUnion", async () => {
		const updateQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable2",
			updates: {},
			arrayUnionUpdate: { fieldName: "testArray", value: "newString" },
		};

		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable2",
		};
		const readResp = await readDocFromFirestore(readQuery);

		let testArray: string[] = [];
		if (readResp) testArray = readResp.data().testArray;

		expect(updateResp).toBeTruthy();
		expect(readResp).toBeTruthy();
		expect(testArray).toContain("newString");
	});

	it("should update an array on a document on firestore with arrayRemove", async () => {
		const updateQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable2",
			updates: {},
			arrayRemoveUpdate: { fieldName: "testArray", value: "newString" },
		};

		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable2",
		};
		const readResp = await readDocFromFirestore(readQuery);

		let testArray: string[] = [];
		if (readResp) testArray = readResp.data().testArray;

		expect(updateResp).toBeTruthy();
		expect(readResp).toBeTruthy();
		expect(testArray).not.toContain("newString");
	});

	it("should increment a number on firestore with incrementUpdate", async () => {
		const updateQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable2",
			updates: {},
			incrementUpdate: { fieldName: "testNumber", amount: 1 },
		};

		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable2",
		};
		const readResp = await readDocFromFirestore(readQuery);

		let testNumber = 0;
		if (readResp) testNumber = readResp.data().testNumber;

		expect(updateResp).toBeTruthy();
		expect(readResp).toBeTruthy();
		expect(testNumber).toBe(1);
	});

	it("should decrement a number on firestore with incrementUpdate", async () => {
		const updateQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable2",
			updates: {},
			incrementUpdate: { fieldName: "testNumber", amount: -1 },
		};

		const updateResp = await updateDocInFirestore(updateQuery);

		const readQuery = {
			collectionPath: "tests/updateDoc/updateSubcollection",
			docId: "updatable2",
		};
		const readResp = await readDocFromFirestore(readQuery);

		let testNumber = 0;
		if (readResp) testNumber = readResp.data().testNumber;

		expect(updateResp).toBeTruthy();
		expect(readResp).toBeTruthy();
		expect(testNumber).toBe(0);
	});
});
