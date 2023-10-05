import { DocumentData, WhereFilterOp, collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseDB } from "../firebaseConfig";

interface Filters {
	where?: string[];
}

interface Params {
	collectionPath: string;
	filters?: Filters;
}

export const readCollectionFromFirestore = async ({ collectionPath, filters }: Params) => {
	try {
		const qry =
			filters && filters.where
				? query(
						collection(FirebaseDB, collectionPath),
						where(filters.where[0], filters.where[1] as WhereFilterOp, filters.where[2]),
				  )
				: collection(FirebaseDB, collectionPath);

		const documents: DocumentData = [];
		const querySnapshot = await getDocs(qry);

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
