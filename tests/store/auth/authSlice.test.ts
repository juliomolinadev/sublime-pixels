import { describe, expect, it } from "vitest";

import { AnyAction } from "@reduxjs/toolkit";
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe("authSlice.ts tests", () => {
	it("should return the initial state and be called auth", () => {
		const action: AnyAction = { type: "" };
		const state = authSlice.reducer(initialState, action);

		expect(authSlice.name).toBe("auth");
		expect(state).toEqual(initialState);
	});

	it("should authenticate", () => {
		const state = authSlice.reducer(initialState, login(demoUser));

		expect(state).toEqual({
			status: "authenticated",
			uid: demoUser.uid,
			email: demoUser.email,
			displayName: demoUser.displayName,
			photoURL: demoUser.photoURL,
			emailVerified: false,
			errorMessage: null,
		});
	});

	it("should logout with null", () => {
		const state = authSlice.reducer(authenticatedState, logout(null));

		expect(state).toEqual({
			status: "not-authenticated",
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			errorMessage: null,
			emailVerified: false,
		});
	});

	it("should logout with message", () => {
		const testErrorMessage = "Test error";

		const state = authSlice.reducer(authenticatedState, logout(testErrorMessage));

		expect(state).toEqual({
			status: "not-authenticated",
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			errorMessage: testErrorMessage,
			emailVerified: false,
		});
	});

	it("should change status to checking", () => {
		const state = authSlice.reducer(authenticatedState, checkingCredentials());
		expect(state.status).toBe("checking");
	});
});
