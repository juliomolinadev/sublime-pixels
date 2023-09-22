import { doc, getDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebaseConfig";

interface Params {
	collectionPath: string;
	docId: string;
}

export const readDocFromFirestore = async ({ collectionPath, docId }: Params) => {
	try {
		const docRef = doc(FirebaseDB, collectionPath, docId);
		const document = await getDoc(docRef);

		if (!document.exists()) return false;

		return document;
	} catch (error) {
		console.log(error);
		return false;
	}
};
