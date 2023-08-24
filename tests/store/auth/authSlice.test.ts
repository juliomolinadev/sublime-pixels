import { AnyAction } from "@reduxjs/toolkit";
import { authSlice, login } from "../../../src/store/auth/authSlice";
import { demoUser, initialState } from "../../fixtures/authFixtures";

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
});
