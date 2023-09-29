import {
	updateDoc,
	doc,
	WithFieldValue,
	DocumentData,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import { FirebaseDB } from "../firebaseConfig";

interface ArrayUpdate {
	fieldName: string;
	value: string | number | boolean;
}

interface Params {
	collectionPath: string;
	updates: WithFieldValue<DocumentData>;
	docId: string;
	arrayUnionUpdate?: ArrayUpdate;
	arrayRemoveUpdate?: ArrayUpdate;
}

export const updateDocInFirestore = async ({
	collectionPath,
	docId,
	updates,
	arrayUnionUpdate,
	arrayRemoveUpdate,
}: Params) => {
	try {
		const docRef = doc(FirebaseDB, collectionPath, docId);

		if (arrayUnionUpdate) {
			await updateDoc(docRef, { [arrayUnionUpdate.fieldName]: arrayUnion(arrayUnionUpdate.value) });
			return true;
		}

		if (arrayRemoveUpdate) {
			await updateDoc(docRef, {
				[arrayRemoveUpdate.fieldName]: arrayRemove(arrayRemoveUpdate.value),
			});
			return true;
		}

		await updateDoc(docRef, updates);

		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
};
