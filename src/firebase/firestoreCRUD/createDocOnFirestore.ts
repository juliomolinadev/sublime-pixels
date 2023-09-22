import { DocumentData, WithFieldValue, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebaseConfig";

interface Params {
	collectionPath: string;
	document: WithFieldValue<DocumentData>;
	docId?: string;
}

export const createDocOnFirestore = async ({ collectionPath, docId, document }: Params) => {
	try {
		if (docId) await setDoc(doc(FirebaseDB, collectionPath, docId), document);
		else await addDoc(collection(FirebaseDB, collectionPath), document);

		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
};
