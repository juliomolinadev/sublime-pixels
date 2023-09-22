import { doc, deleteDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebaseConfig";

interface Params {
	collectionPath: string;
	docId: string;
}

export const deleteDocOnFirestore = async ({ collectionPath, docId }: Params) => {
	try {
		await deleteDoc(doc(FirebaseDB, collectionPath, docId));
		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
};
