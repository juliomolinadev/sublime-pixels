import { describe, expect, test } from "vitest";

import { AnyAction } from "@reduxjs/toolkit";
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, authInitialState } from "../../fixtures/authFixtures";

describe("authSlice.ts tests", () => {
	test("should return the initial state and be called auth", () => {
		const action: AnyAction = { type: "" };
		const state = authSlice.reducer(authInitialState, action);

		expect(authSlice.name).toBe("auth");
		expect(state).toEqual(authInitialState);
	});

	test("should authenticate", () => {
		const state = authSlice.reducer(authInitialState, login(demoUser));

		expect(state).toEqual({
			status: "authenticated",
			uid: demoUser.uid,
			email: demoUser.email,
			displayName: demoUser.displayName,
			photoURL: demoUser.photoURL,
			emailVerified: false,
			authErrorMessage: null,
		});
	});

	test("should logout with null", () => {
		const state = authSlice.reducer(authenticatedState, logout(null));

		expect(state).toEqual({
			status: "not-authenticated",
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			authErrorMessage: null,
			emailVerified: false,
		});
	});

	test("should logout with message", () => {
		const testErrorMessage = "Test error";

		const state = authSlice.reducer(authenticatedState, logout(testErrorMessage));

		expect(state).toEqual({
			status: "not-authenticated",
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			authErrorMessage: testErrorMessage,
			emailVerified: false,
		});
	});

	test("should change status to checking", () => {
		const state = authSlice.reducer(authenticatedState, checkingCredentials());
		expect(state.status).toBe("checking");
	});
});
