import { doc, writeBatch, DocumentData } from "firebase/firestore";
import { FirebaseDB } from "../firebaseConfig";

interface Row extends DocumentData {
	id: string;
}

interface Props {
	collectionPath: string;
	data: Row[];
}

export const createBatchOnFirestore = async ({ collectionPath, data }: Props) => {
	try {
		const batch = writeBatch(FirebaseDB);

		data.forEach((row) => {
			const rowRef = doc(FirebaseDB, collectionPath, row.id);
			batch.set(rowRef, row);
		});

		await batch.commit();

		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
};
