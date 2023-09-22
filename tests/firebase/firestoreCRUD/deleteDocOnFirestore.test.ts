// @vitest-environment node

import { describe, expect, it } from "vitest";
import { createDocOnFirestore } from "../../../src/firebase/firestoreCRUD/createDocOnFirestore";
import { deleteDocOnFirestore } from "../../../src/firebase/firestoreCRUD/deleteDocOnFirestore";
import { readDocFromFirestore } from "../../../src/firebase/firestoreCRUD/readDocFromFirestore";

describe("deleteDocOnFirestore() tests", () => {
	it("should read a document and delete it", async () => {
		const document = { id: "deletable", name: "test" };
		const query = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "deletable",
			document,
		};

		const success = await createDocOnFirestore(query);

		const deleteQuery = {
			collectionPath: "tests/createDoc/createSubcollection",
			docId: "deletable",
		};
		const updateSuccess = await deleteDocOnFirestore(deleteQuery);

		const readQuery = { collectionPath: "tests/createDoc/createSubcollection", docId: "deletable" };
		const readResp = await readDocFromFirestore(readQuery);

		expect(success).toBeTruthy();
		expect(updateSuccess).toBeTruthy();
		expect(readResp).toBeFalsy();
	});

	// it("should return false if the document does not exist", async () => {
	// 	const deleteQuery = {
	// 		collectionPath: "tests/createDoc/createSubcollection",
	// 		docId: "x",
	// 	};
	// 	const deleteSuccess = await deleteDocOnFirestore(deleteQuery);

	// 	expect(deleteSuccess).toBeFalsy();
	// });
});
