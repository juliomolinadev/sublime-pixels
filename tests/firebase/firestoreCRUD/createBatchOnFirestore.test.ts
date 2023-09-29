// @vitest-environment node

import { describe, expect, it } from "vitest";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../../src/firebase/firebaseConfig";
import { createBatchOnFirestore } from "../../../src/firebase/firestoreCRUD/createBatchOnFirestore";

describe("createBatchOnFirestore() tests", () => {
	it("should create a batch of document on firestore", async () => {
		const data = [
			{ id: "1", name: "batch item 1" },
			{ id: "2", name: "batch item 2" },
			{ id: "3", name: "batch item 3" },
		];

		const query = { collectionPath: "tests/createDoc/createSubcollection", data };

		const createResp = await createBatchOnFirestore(query);

		expect(createResp).toBeTruthy();

		const collectionRef = collection(FirebaseDB, "tests/createDoc/createSubcollection");
		const docs = await getDocs(collectionRef);

		const deletePromises: Promise<void>[] = [];

		docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
		await Promise.all(deletePromises);
	});
});
