import { describe, expect, it } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";
import {
	newTestCurrentItems,
	newTestItems,
	testItemsInitialState,
	testNewCurrentItemsSettedState,
	testNewItemsAddedState,
} from "../../fixtures";

import { addItems, itemsSlice, setCurrentItems } from "../../../src/store/items/itemsSlice";

describe("itemsSlice.ts tests", () => {
	it("should return the initial state and be called items", () => {
		const action: AnyAction = { type: "" };
		const state = itemsSlice.reducer(testItemsInitialState, action);

		expect(itemsSlice.name).toBe("items");
		expect(state).toEqual(testItemsInitialState);
	});

	it("should add items", () => {
		const state = itemsSlice.reducer(testItemsInitialState, addItems(newTestItems));

		expect(state).toEqual(testNewItemsAddedState);
	});

	it("should set the current items", () => {
		const state = itemsSlice.reducer(testNewItemsAddedState, setCurrentItems("1"));

		expect(state).toEqual(testNewCurrentItemsSettedState);
	});
});
