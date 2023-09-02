import { describe, expect, test } from "vitest";
import { AnyAction } from "@reduxjs/toolkit";

import {
	setUiErrorMessage,
	switchAuthForm,
	switchLoadingState,
	switchLoginModal,
	switchRegisterModal,
	uiSlice,
} from "../../../src/store/ui/uiSlice";
import {
	openLoginModalState,
	openRegisterModalState,
	uiInitialState,
	uiLoadingState,
} from "../../fixtures/uiFixtures";

describe("uiSlice.ts tests", () => {
	test("should return the initial state and be called ui", () => {
		const action: AnyAction = { type: "" };
		const state = uiSlice.reducer(uiInitialState, action);

		expect(uiSlice.name).toBe("ui");
		expect(state).toEqual(uiInitialState);
	});

	test("should switch loading state", () => {
		const state = uiSlice.reducer(uiInitialState, switchLoadingState());

		expect(state).toEqual(uiLoadingState);
	});

	test("should switch register modal state", () => {
		const state = uiSlice.reducer(uiInitialState, switchRegisterModal());

		expect(state).toEqual(openRegisterModalState);
	});

	test("should switch login modal state", () => {
		const state = uiSlice.reducer(uiInitialState, switchLoginModal());

		expect(state).toEqual(openLoginModalState);
	});

	test("should switch register and login modal state", () => {
		const state = uiSlice.reducer(openRegisterModalState, switchAuthForm());

		expect(state).toEqual(openLoginModalState);
	});

	test("should set error message", () => {
		const testError = "Test error";
		const state = uiSlice.reducer(uiInitialState, setUiErrorMessage(testError));

		expect(state).toEqual({ ...uiInitialState, uiErrorMessage: testError });
	});
});
