import { describe, expect, it } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";
import {
	newTestItems,
	testItemsInitialState,
	testNewCurrentItemsSettedState,
	testNewItemsAddedState,
} from "../../fixtures";

import {
	addDownload,
	addItems,
	decrementDislikes,
	decrementLikes,
	incrementBuyLinkCounter,
	incrementDislikes,
	incrementLikes,
	itemsSlice,
	setCurrentItems,
	switchDownloadMenu,
	switchDownloadingStraight,
	switchDownloadingTapered,
} from "../../../src/store/items/itemsSlice";

describe("itemsSlice.ts tests", () => {
	it("should return the initial state and be called items", () => {
		const action: AnyAction = { type: "" };
		const state = itemsSlice.reducer(testItemsInitialState, action);

		expect(itemsSlice.name).toBe("items");
		expect(state).toEqual(testItemsInitialState);
	});

	it("should add items", () => {
		const state = itemsSlice.reducer(testItemsInitialState, addItems(newTestItems));

		expect(state.items).toEqual(testNewItemsAddedState.items);
		expect(state.currentItems).toEqual(testNewItemsAddedState.currentItems);
		expect(state.currentItemIds.length).toBe(testNewItemsAddedState.currentItemIds.length);
	});

	it("should set the current items", () => {
		const state = itemsSlice.reducer(testNewItemsAddedState, setCurrentItems("1"));

		expect(state.currentItems).toEqual(testNewCurrentItemsSettedState.currentItems);
		expect(state.currentItemIds.length).toEqual(
			testNewCurrentItemsSettedState.currentItemIds.length,
		);
	});

	it("should change the downloading menu state of an item", () => {
		const state = itemsSlice.reducer(testNewCurrentItemsSettedState, switchDownloadMenu("1"));

		expect(state.currentItems["1"].isOpenDownloadMenu).toBeTruthy();
	});

	it("should change the straight image downloading state of an item", () => {
		const state = itemsSlice.reducer(
			testNewCurrentItemsSettedState,
			switchDownloadingStraight("1"),
		);

		expect(state.currentItems["1"].isDownloadingStraight).toBeTruthy();
	});

	it("should change the tapered image downloading state of an item", () => {
		const state = itemsSlice.reducer(testNewCurrentItemsSettedState, switchDownloadingTapered("1"));

		expect(state.currentItems["1"].isDownloadingTapered).toBeTruthy();
	});

	it("should increment the download counter in an item", () => {
		const itemId = "1";
		const state = itemsSlice.reducer(testNewCurrentItemsSettedState, addDownload(itemId));

		expect(state.currentItems[itemId].downloads).toBe(1);
		expect(state.items.find((item) => item.id === itemId)!.downloads).toBe(1);
	});

	it("should increment the likes counter in an item", () => {
		const itemId = "1";
		const state = itemsSlice.reducer(testNewCurrentItemsSettedState, incrementLikes(itemId));

		expect(state.currentItems[itemId].likes).toBe(1);
		expect(state.items.find((item) => item.id === itemId)!.likes).toBe(1);
	});

	it("should decrement the likes counter in an item", () => {
		const itemId = "1";
		const state = itemsSlice.reducer(testNewCurrentItemsSettedState, decrementLikes(itemId));

		expect(state.currentItems[itemId].likes).toBe(-1);
		expect(state.items.find((item) => item.id === itemId)!.likes).toBe(-1);
	});

	it("should increment the dislikes counter in an item", () => {
		const itemId = "1";
		const state = itemsSlice.reducer(testNewCurrentItemsSettedState, incrementDislikes(itemId));

		expect(state.currentItems[itemId].disLikes).toBe(1);
		expect(state.items.find((item) => item.id === itemId)!.disLikes).toBe(1);
	});

	it("should decrement the dislikes counter in an item", () => {
		const itemId = "1";
		const state = itemsSlice.reducer(testNewCurrentItemsSettedState, decrementDislikes(itemId));

		expect(state.currentItems[itemId].disLikes).toBe(-1);
		expect(state.items.find((item) => item.id === itemId)!.disLikes).toBe(-1);
	});

	it("should increment the buy link counter in an item", () => {
		const itemId = "1";
		const state = itemsSlice.reducer(
			testNewCurrentItemsSettedState,
			incrementBuyLinkCounter(itemId),
		);

		expect(state.currentItems[itemId].buyLinkCounter).toBe(1);
		expect(state.items.find((item) => item.id === itemId)!.buyLinkCounter).toBe(1);
	});
});
