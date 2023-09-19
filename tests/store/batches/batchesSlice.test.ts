import { describe, expect } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";
import { it } from "vitest";
import { batchInitialState } from "../../fixtures/batchFixtures";
import { batchSlice } from "../../../src/store/batches/batchesSlice";

describe("batchSlice.ts tests", () => {
	it("should return the initial state and be called batch", () => {
		const action: AnyAction = { type: "" };
		const state = batchSlice.reducer(batchInitialState, action);

		expect(batchSlice.name).toBe("batch");
		expect(state).toEqual(batchInitialState);
	});
});
