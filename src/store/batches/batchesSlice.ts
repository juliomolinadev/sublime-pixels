import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BatchesProps } from "../interfaces";

interface BatchesState {
	batches: { [key: string]: BatchesProps };
	batchesArray: string[];
	activeBatch: string;
}

const initialState: BatchesState = {
	batches: {},
	activeBatch: "",
	batchesArray: [],
};

export const batchesSlice = createSlice({
	name: "batches",
	initialState,
	reducers: {
		addBatch: (state, action: PayloadAction<BatchesProps>) => {
			state.batches[action.payload.id] = action.payload;
		},

		setActiveBatch: (state, action: PayloadAction<string>) => {
			state.activeBatch = action.payload;
		},

		setBatchesArray: (state, action: PayloadAction<string[]>) => {
			state.batchesArray = action.payload;
		},
	},
});

export const { addBatch, setActiveBatch, setBatchesArray } = batchesSlice.actions;
