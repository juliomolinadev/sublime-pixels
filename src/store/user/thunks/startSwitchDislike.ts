import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch, RootState } from "../../store";
import { addDislike, removeDislike, removeLike } from "../userSlice";

export const startSwitchDislike = (itemId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { uid, likes, dislikes } = state.user;

		if (!uid) return false;

		// If the user has already liked the item, remove the like and add the dislike
		if (likes.includes(itemId)) {
			const removeLikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "likes", value: itemId },
			};

			const wasLikeRemoved = await updateDocInFirestore(removeLikeQuery);
			if (wasLikeRemoved) dispatch(removeLike(itemId));

			const addDislikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasDislikeAdded = await updateDocInFirestore(addDislikeQuery);
			if (wasDislikeAdded) dispatch(addDislike(itemId));

			if (wasLikeRemoved && wasDislikeAdded) return true;
		}

		if (dislikes.includes(itemId)) {
			const removeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasRemoved = await updateDocInFirestore(removeQuery);

			if (wasRemoved) dispatch(removeDislike(itemId));
			return wasRemoved;
		}

		if (!dislikes.includes(itemId)) {
			const addQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasAdded = await updateDocInFirestore(addQuery);

			if (wasAdded) dispatch(addDislike(itemId));
			return wasAdded;
		}
	};
};
