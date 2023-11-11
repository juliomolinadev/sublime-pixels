import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ItemProps } from "../interfaces";
import { shuffle } from "../../helpers/shuffle";

interface ItemsState {
	items: ItemProps[];
	currentItems: { [key: string]: ItemProps };
	currentItemIds: string[];
}

const initialState: ItemsState = {
	items: [],
	currentItems: {},
	currentItemIds: [],
};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		addItems: (state, action: PayloadAction<ItemProps[]>) => {
			const newItems: { [key: string]: ItemProps } = {};

			action.payload.forEach((item) => {
				newItems[item.id] = item;
			});

			state.currentItems = { ...newItems };
			state.currentItemIds = shuffle(Object.keys(newItems));

			action.payload.forEach((item) => {
				state.items.push(item);
			});
		},

		setCurrentItems: (state, action: PayloadAction<string>) => {
			const newItems: { [key: string]: ItemProps } = {};

			const filteredItems = state.items.filter((item) => item.batch === action.payload);

			filteredItems.forEach((item) => {
				newItems[item.id] = item;
			});

			state.currentItems = { ...newItems };
			state.currentItemIds = shuffle(Object.keys(newItems));
		},

		switchDownloadMenu: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].isOpenDownloadMenu =
				!state.currentItems[action.payload].isOpenDownloadMenu;
		},

		switchDownloadingStraight: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].isDownloadingStraight =
				!state.currentItems[action.payload].isDownloadingStraight;
		},

		switchDownloadingTapered: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].isDownloadingTapered =
				!state.currentItems[action.payload].isDownloadingTapered;
		},

		addDownload: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].downloads += 1;
			state.items.find((item) => item.id === action.payload)!.downloads += 1;
		},

		incrementLikes: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].likes += 1;
			state.items.find((item) => item.id === action.payload)!.likes += 1;
		},

		decrementLikes: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].likes -= 1;
			state.items.find((item) => item.id === action.payload)!.likes -= 1;
		},

		incrementDislikes: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].disLikes += 1;
			state.items.find((item) => item.id === action.payload)!.disLikes += 1;
		},

		decrementDislikes: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].disLikes -= 1;
			state.items.find((item) => item.id === action.payload)!.disLikes -= 1;
		},
	},
});

export const {
	addItems,
	setCurrentItems,
	switchDownloadMenu,
	switchDownloadingStraight,
	switchDownloadingTapered,
	addDownload,
	incrementLikes,
	decrementLikes,
	incrementDislikes,
	decrementDislikes,
} = itemsSlice.actions;
