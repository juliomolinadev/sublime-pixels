import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { decrementDislikes, decrementLikes, incrementDislikes } from "../../items";
import { AppDispatch, RootState } from "../../store";
import { addDislike, removeDislike, removeLike } from "../userSlice";

export const startSwitchDislike = (itemId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { uid, likes, dislikes } = state.user;

		if (!uid) return false;

		// If the user has already LIKED the item, remove the like and add the dislike
		if (likes.includes(itemId)) {
			//remove like from user
			const removeLikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "likes", value: itemId },
			};

			const wasLikeRemoved = await updateDocInFirestore(removeLikeQuery);
			if (wasLikeRemoved) dispatch(removeLike(itemId));

			// decremente likes in item
			const decrementLikesQuery = {
				collectionPath: "items",
				docId: itemId,
				updates: {},
				incrementUpdate: { fieldName: "likes", amount: -1 },
			};

			const wasLikeDecremented = await updateDocInFirestore(decrementLikesQuery);
			if (wasLikeDecremented) dispatch(decrementLikes(itemId));

			// add dislike to user
			const addDislikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasDislikeAdded = await updateDocInFirestore(addDislikeQuery);
			if (wasDislikeAdded) dispatch(addDislike(itemId));

			// increment dislikes in item
			const incrementDislikesQuery = {
				collectionPath: "items",
				docId: itemId,
				updates: {},
				incrementUpdate: { fieldName: "disLikes", amount: 1 },
			};

			const wasDislikeIncremented = await updateDocInFirestore(incrementDislikesQuery);
			if (wasDislikeIncremented) dispatch(incrementDislikes(itemId));

			if (wasLikeRemoved && wasDislikeAdded && wasLikeDecremented && wasDislikeIncremented)
				return true;

			return false;
		}

		// If the user has already DISLIKED the item, remove the dislike
		if (dislikes.includes(itemId)) {
			// remove dislike from user
			const removeDislikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasRemoved = await updateDocInFirestore(removeDislikeQuery);
			if (wasRemoved) dispatch(removeDislike(itemId));

			// decrement dislikes in item
			const decrementDislikesQuery = {
				collectionPath: "items",
				docId: itemId,
				updates: {},
				incrementUpdate: { fieldName: "disLikes", amount: -1 },
			};

			const wasDecremented = await updateDocInFirestore(decrementDislikesQuery);
			if (wasDecremented) dispatch(decrementDislikes(itemId));

			if (wasRemoved && wasDecremented) return true;
			return false;
		}

		// If the user  hasn't already DISLIKED the item, add a dislike
		if (!dislikes.includes(itemId)) {
			// add dislike to user
			const addDislikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasAdded = await updateDocInFirestore(addDislikeQuery);
			if (wasAdded) dispatch(addDislike(itemId));

			// increment dislikes in item
			const incrementDislikesQuery = {
				collectionPath: "items",
				docId: itemId,
				updates: {},
				incrementUpdate: { fieldName: "disLikes", amount: 1 },
			};

			const wasIncremented = await updateDocInFirestore(incrementDislikesQuery);
			if (wasIncremented) dispatch(incrementDislikes(itemId));

			if (wasAdded && wasIncremented) return true;
			return false;
		}
	};
};
