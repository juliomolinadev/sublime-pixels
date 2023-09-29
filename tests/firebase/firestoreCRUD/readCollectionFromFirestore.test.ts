// @vitest-environment node

import { describe, expect, it } from "vitest";
import { readCollectionFromFirestore } from "../../../src/firebase/firestoreCRUD/readCollectionFromFirestore";
import { DocumentData } from "firebase/firestore";

describe("readCollectionFromFirestore() tests", () => {
	it("should read two documents from firestore", async () => {
		const documents: DocumentData[] = [];
		const readResp = await readCollectionFromFirestore("/tests/readDoc/readSubcollection");

		if (readResp)
			readResp.forEach((doc: DocumentData) => {
				documents.push(doc.data());
			});

		expect(readResp).toBeTruthy();
		expect(documents.length).toBe(2);
	});
});
