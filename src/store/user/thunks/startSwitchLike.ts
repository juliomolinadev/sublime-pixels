import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { AppDispatch, RootState } from "../../store";
import { addLike, removeDislike, removeLike } from "../userSlice";

export const startSwitchLike = (itemId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { uid, likes, dislikes } = state.user;

		if (!uid) return false;

		// If the user has already disliked the item, remove the dislike and add the like
		if (dislikes.includes(itemId)) {
			const removeDislikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasDislikeRemoved = await updateDocInFirestore(removeDislikeQuery);
			if (wasDislikeRemoved) dispatch(removeDislike(itemId));

			const addLikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "likes", value: itemId },
			};

			const wasLikeAdded = await updateDocInFirestore(addLikeQuery);
			if (wasLikeAdded) dispatch(addLike(itemId));

			if (wasDislikeRemoved && wasLikeAdded) return true;
		}

		if (likes.includes(itemId)) {
			const removeLikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "likes", value: itemId },
			};

			const wasRemoved = await updateDocInFirestore(removeLikeQuery);

			if (wasRemoved) dispatch(removeLike(itemId));
			return wasRemoved;
		}

		if (!likes.includes(itemId)) {
			const addLikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "likes", value: itemId },
			};

			const wasLikeAdded = await updateDocInFirestore(addLikeQuery);

			if (wasLikeAdded) dispatch(addLike(itemId));
			return wasLikeAdded;
		}
	};
};
