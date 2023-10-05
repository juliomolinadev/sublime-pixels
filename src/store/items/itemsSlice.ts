import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ItemProps } from "../interfaces";

interface ItemsState {
	items: ItemProps[];
	currentItems: { [key: string]: ItemProps };
}

const initialState: ItemsState = {
	items: [],
	currentItems: {},
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
		},
	},
});

export const { addItems, setCurrentItems } = itemsSlice.actions;
