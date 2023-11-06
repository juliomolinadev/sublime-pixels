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

		switchDownloadingItem: (state, action: PayloadAction<string>) => {
			state.currentItems[action.payload].isDownloading =
				!state.currentItems[action.payload].isDownloading;
		},
	},
});

export const { addItems, setCurrentItems, switchDownloadingItem } = itemsSlice.actions;
