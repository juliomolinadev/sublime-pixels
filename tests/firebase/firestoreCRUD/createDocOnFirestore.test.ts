// @vitest-environment node

import { describe, expect, it } from "vitest";
import { createDocOnFirestore } from "../../../src/firebase/firestoreCRUD/createDocOnFirestore";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../../src/firebase/firebaseConfig";

describe("createDocOnFirestore() tests", () => {
	it("should create a document with defined id on firestore", async () => {
		const document = { id: "1233", name: "test" };
		const query = { collectionPath: "tests/createDoc/createSubcollection", docId: "123", document };

		const createResp = await createDocOnFirestore(query);

		expect(createResp).toBeTruthy();
	});

	it("should create a document with random id on firestore", async () => {
		const document = { id: "random", name: "test" };
		const query = { collectionPath: "tests/createDoc/createSubcollection", document };

		const createResp = await createDocOnFirestore(query);

		expect(createResp).toBeTruthy();

		const collectionRef = collection(FirebaseDB, "tests/createDoc/createSubcollection");
		const docs = await getDocs(collectionRef);

		const deletePromises: Promise<void>[] = [];

		docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
		await Promise.all(deletePromises);
	});
});
