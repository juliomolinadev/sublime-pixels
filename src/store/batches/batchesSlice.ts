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
	activeBatch: "10",
	batchesArray: ["10", "9", "8", "7", "6", "5", "4", "3", "2"],
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
