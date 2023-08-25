import { AnyAction } from "@reduxjs/toolkit";
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe("authSlice.ts tests", () => {
	test("should return the initial state and be called auth", () => {
		const action: AnyAction = { type: "" };
		const state = authSlice.reducer(initialState, action);

		expect(authSlice.name).toBe("auth");
		expect(state).toEqual(initialState);
	});

	test("should authenticate", () => {
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

	test("should logout with null", () => {
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

	test("should logout with message", () => {
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

	test("should change status to checking", () => {
		const state = authSlice.reducer(authenticatedState, checkingCredentials());
		expect(state.status).toBe("checking");
	});
});
