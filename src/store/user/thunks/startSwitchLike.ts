import { updateDocInFirestore } from "../../../firebase/firestoreCRUD";
import { decrementDislikes, decrementLikes, incrementLikes } from "../../items";
import { AppDispatch, RootState } from "../../store";
import { addLike, removeDislike, removeLike } from "../userSlice";

export const startSwitchLike = (itemId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		const { uid, likes, dislikes } = state.user;

		if (!uid) return false;

		// TODO: Implement transactions o batch writes

		// If the user has already DISLIKED the item, remove the dislike and add a like
		if (dislikes.includes(itemId)) {
			// remove dislike from user
			const removeDislikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "dislikes", value: itemId },
			};

			const wasDislikeRemoved = await updateDocInFirestore(removeDislikeQuery);
			if (wasDislikeRemoved) dispatch(removeDislike(itemId));

			// decrement dislikes in item
			const decrementDislikesQuery = {
				collectionPath: "items",
				docId: itemId,
				updates: {},
				incrementUpdate: { fieldName: "disLikes", amount: -1 },
			};

			const wasDislikeDecremented = await updateDocInFirestore(decrementDislikesQuery);
			if (wasDislikeDecremented) dispatch(decrementDislikes(itemId));

			// add like to user
			const addLikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "likes", value: itemId },
			};

			const wasLikeAdded = await updateDocInFirestore(addLikeQuery);
			if (wasLikeAdded) dispatch(addLike(itemId));

			// Increment likes in item
			const incrementLikesQuery = {
				collectionPath: "items",
				docId: itemId,
				updates: {},
				incrementUpdate: { fieldName: "likes", amount: 1 },
			};

			const wasLikeIncremented = await updateDocInFirestore(incrementLikesQuery);
			if (wasLikeIncremented) dispatch(incrementLikes(itemId));

			if (wasDislikeRemoved && wasLikeAdded && wasDislikeDecremented && wasLikeIncremented)
				return true;

			return false;
		}

		// If the user has already LIKED the item, remove the like
		if (likes.includes(itemId)) {
			// remove like from user
			const removeLikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayRemoveUpdate: { fieldName: "likes", value: itemId },
			};

			const wasRemoved = await updateDocInFirestore(removeLikeQuery);
			if (wasRemoved) dispatch(removeLike(itemId));

			// decrement likes in item
			const decrementLikesQuery = {
				collectionPath: "items",
				docId: itemId,
				updates: {},
				incrementUpdate: { fieldName: "likes", amount: -1 },
			};

			const wasDecremented = await updateDocInFirestore(decrementLikesQuery);
			if (wasDecremented) dispatch(decrementLikes(itemId));

			if (wasRemoved && wasDecremented) return true;
			return false;
		}

		// If the user  hasn't already LIKED the item, add a like
		if (!likes.includes(itemId)) {
			// add like to user
			const addLikeQuery = {
				collectionPath: "users",
				docId: uid,
				updates: {},
				arrayUnionUpdate: { fieldName: "likes", value: itemId },
			};

			const wasLikeAdded = await updateDocInFirestore(addLikeQuery);
			if (wasLikeAdded) dispatch(addLike(itemId));

			// Increment likes in item
			const incrementLikesQuery = {
				collectionPath: "items",
				docId: itemId,
				updates: {},
				incrementUpdate: { fieldName: "likes", amount: 1 },
			};

			const wasLikeIncremented = await updateDocInFirestore(incrementLikesQuery);
			if (wasLikeIncremented) dispatch(incrementLikes(itemId));

			if (wasLikeAdded && wasLikeIncremented) return true;
			return false;
		}
	};
};
