import { updateDoc, doc, WithFieldValue, DocumentData } from "firebase/firestore";
import { FirebaseDB } from "../firebaseConfig";

interface Params {
	collectionPath: string;
	updates: WithFieldValue<DocumentData>;
	docId: string;
}

export const updateDocInFirestore = async ({ collectionPath, docId, updates }: Params) => {
	try {
		const docRef = doc(FirebaseDB, collectionPath, docId);

		await updateDoc(docRef, updates);

		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
};
