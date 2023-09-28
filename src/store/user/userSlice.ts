import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserSliceState {
	uid: string | null;
	downloads: string[];
	likes: string[];
	dislikes: string[];
}

const initialState: UserSliceState = {
	uid: null,
	downloads: [],
	likes: [],
	dislikes: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserSliceState>) => {
			state = action.payload;
			return state;
		},

		addDownload: (state, action: PayloadAction<string>) => {
			state.downloads.push(action.payload);
		},

		addLike: (state, action: PayloadAction<string>) => {
			state.likes.push(action.payload);
		},

		removeLike: (state, action: PayloadAction<string>) => {
			state.likes = state.likes.filter((id) => id !== action.payload);
		},

		addDislike: (state, action: PayloadAction<string>) => {
			state.dislikes.push(action.payload);
		},

		removeDislike: (state, action: PayloadAction<string>) => {
			state.dislikes = state.dislikes.filter((id) => id !== action.payload);
		},
	},
});

export const { setUser, addDownload, addLike, removeLike, addDislike, removeDislike } =
	userSlice.actions;