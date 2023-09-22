import { DocumentData, collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebaseConfig";

export const readCollectionFromFirestore = async (collectionPath: string) => {
	// export const readCollectionFromFirestore = async () => {
	try {
		const documents: DocumentData = [];
		const querySnapshot = await getDocs(collection(FirebaseDB, collectionPath));

		querySnapshot.forEach((doc) => {
			documents.push(doc);
		});

		if (documents.length === 0) return false;

		return documents;
	} catch (error) {
		console.log(error);
		return false;
	}
};
