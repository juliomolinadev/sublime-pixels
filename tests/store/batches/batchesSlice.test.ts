import { describe, expect } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";
import { it } from "vitest";
import { batchesInitialState, batchesNewState, newBatch } from "../../fixtures";
import { addBatch, batchSlice } from "../../../src/store/batches/batchesSlice";

describe("batchSlice.ts tests", () => {
	it("should return the initial state and be called batch", () => {
		const action: AnyAction = { type: "" };
		const state = batchSlice.reducer(batchesInitialState, action);

		expect(batchSlice.name).toBe("batch");
		expect(state).toEqual(batchesInitialState);
	});

	it("should add a batch", () => {
		const state = batchSlice.reducer(batchesInitialState, addBatch(newBatch));

		expect(state).toEqual(batchesNewState);
	});
});
