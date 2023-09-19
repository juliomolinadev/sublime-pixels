import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BatchesProps } from "../interfaces";

const initialState: { [key: string]: BatchesProps } = {};

export const batchSlice = createSlice({
	name: "batch",
	initialState,
	reducers: {
		addBatch: (state, action: PayloadAction<BatchesProps>) => {
			state[action.payload.id] = action.payload;
		},
	},
});

export const { addBatch } = batchSlice.actions;
