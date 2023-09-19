import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ItemProps } from "../interfaces";

const initialState: { [key: string]: ItemProps } = {};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<{ [key: string]: ItemProps }>) => {
			state = action.payload;
			return state;
		},
	},
});

export const { setItems } = itemsSlice.actions;
