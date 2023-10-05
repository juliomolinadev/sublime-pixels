// @vitest-environment node

import { describe, expect, it } from "vitest";
import { readCollectionFromFirestore } from "../../../src/firebase/firestoreCRUD/readCollectionFromFirestore";
import { DocumentData, collection } from "firebase/firestore";

describe("readCollectionFromFirestore() tests", () => {
	it("should read two documents from firestore", async () => {
		const query = {
			collectionPath: "tests/readDoc/readSubcollection",
		};
		const documents: DocumentData[] = [];
		const readResp = await readCollectionFromFirestore(query);

		if (readResp)
			readResp.forEach((doc: DocumentData) => {
				documents.push(doc.data());
			});

		expect(readResp).toBeTruthy();
		expect(documents.length).toBe(2);
	});

	it("should read one documents from firestore", async () => {
		const query = {
			collectionPath: "tests/readDoc/readSubcollection",
			filters: {
				where: ["id", "==", "123"],
			},
		};
		const documents: DocumentData[] = [];
		const readResp = await readCollectionFromFirestore(query);

		if (readResp)
			readResp.forEach((doc: DocumentData) => {
				documents.push(doc.data());
			});

		expect(readResp).toBeTruthy();
		expect(documents.length).toBe(1);
	});
});
