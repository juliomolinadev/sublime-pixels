import { describe, expect } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";
import { it } from "vitest";
import {
	batchesInitialState,
	batchesNewActiveBatch,
	batchesNewBatch,
	batchesNewBatchesArray,
	newBatch,
} from "../../fixtures";
import {
	addBatch,
	batchesSlice,
	setActiveBatch,
	setBatchesArray,
} from "../../../src/store/batches/batchesSlice";

describe("batchesSlice.ts tests", () => {
	it("should return the initial state and be called batch", () => {
		const action: AnyAction = { type: "" };
		const state = batchesSlice.reducer(batchesInitialState, action);

		expect(batchesSlice.name).toBe("batches");
		expect(state).toEqual(batchesInitialState);
	});

	it("should add a batch", () => {
		const state = batchesSlice.reducer(batchesInitialState, addBatch(newBatch));

		expect(state).toEqual(batchesNewBatch);
	});

	it("should set the active batch", () => {
		const state = batchesSlice.reducer(batchesInitialState, setActiveBatch("2"));

		expect(state).toEqual(batchesNewActiveBatch);
	});

	it("should set the batches array", () => {
		const state = batchesSlice.reducer(batchesInitialState, setBatchesArray(["1", "2"]));

		expect(state).toEqual(batchesNewBatchesArray);
	});
});
