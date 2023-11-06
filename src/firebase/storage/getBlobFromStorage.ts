import { getBlob, ref } from "firebase/storage";
import { FirebaseStorage } from "../firebaseConfig";

export const getBlobFromStorage = async (url: string) => {
	try {
		const fileRef = ref(FirebaseStorage, url);
		const blob = await getBlob(fileRef);

		return blob;
	} catch (error) {
		console.log(error);
	}
};
