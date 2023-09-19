import { describe, expect, it } from "vitest";
import { itemsSlice, setItems } from "../../../src/store/items/itemsSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { itemsInitialState, itemsNewState } from "../../fixtures";

describe("itemsSlice.ts tests", () => {
	it("should return the initial state and be called items", () => {
		const action: AnyAction = { type: "" };
		const state = itemsSlice.reducer(itemsInitialState, action);

		expect(itemsSlice.name).toBe("items");
		expect(state).toEqual(itemsInitialState);
	});

	it("should set the items", () => {
		const state = itemsSlice.reducer(itemsInitialState, setItems(itemsNewState));

		expect(state).toEqual(itemsNewState);
	});
});
