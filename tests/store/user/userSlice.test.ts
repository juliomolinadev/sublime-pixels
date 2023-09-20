import { AnyAction } from "@reduxjs/toolkit";
import { describe, expect, it } from "vitest";
import {
	addDislike,
	addDownload,
	addLike,
	removeDislike,
	removeLike,
	setUser,
	userSlice,
} from "../../../src/store/user/userSlice";
import {
	newDislikeUserState,
	newDownloadUserState,
	newLikeUserState,
	setUserState,
	userInitialState,
} from "../../fixtures";

describe("userSlice.ts tests", () => {
	it("should return the initial state and be called user", () => {
		const action: AnyAction = { type: "" };
		const state = userSlice.reducer(userInitialState, action);

		expect(userSlice.name).toBe("user");
		expect(state).toEqual(userInitialState);
	});

	it("should set the user", () => {
		const newUser = {
			uid: "1234567890",
			downloads: [],
			likes: [],
			dislikes: [],
		};
		const state = userSlice.reducer(userInitialState, setUser(newUser));

		expect(state).toEqual(setUserState);
	});

	it("should add a download", () => {
		const state = userSlice.reducer(setUserState, addDownload("1234567890"));
		expect(state).toEqual(newDownloadUserState);
	});

	it("should add a like", () => {
		const state = userSlice.reducer(setUserState, addLike("1234567890"));
		expect(state).toEqual(newLikeUserState);
	});

	it("should remove a like", () => {
		const state = userSlice.reducer(newLikeUserState, removeLike("1234567890"));
		expect(state).toEqual(setUserState);
	});

	it("should add a dislike", () => {
		const state = userSlice.reducer(setUserState, addDislike("1234567890"));
		expect(state).toEqual(newDislikeUserState);
	});

	it("should remove a dislike", () => {
		const state = userSlice.reducer(newDislikeUserState, removeDislike("1234567890"));
		expect(state).toEqual(setUserState);
	});
});
