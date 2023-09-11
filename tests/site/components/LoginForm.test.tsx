import React from "react";
import { beforeEach, describe, expect, it, vi, test } from "vitest";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test-utils";
import { LoginForm } from "../../../src/site/components/LoginForm";
import { openLoginModalState } from "../../fixtures/uiFixtures";

const mockStartLoginWithEmailPassword = vi.fn();
vi.mock("../../../src/store/auth/thunks/startLoginWithEmailPassword", () => ({
	startLoginWithEmailPassword: () => mockStartLoginWithEmailPassword,
}));

const preloadedState = {
	ui: openLoginModalState,
};

describe("<LoginForm /> tests", () => {
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should render component", () => {
		renderWithProviders(<LoginForm />, { preloadedState });

		expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
	});

	it("should call startLoginWithEmailPassword", async () => {
		renderWithProviders(<LoginForm />, { preloadedState });

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		fireEvent.change(emailField, { target: { name: "email", value: "user@mail.com" } });

		const passwordField = screen.getByLabelText("passwordInput");
		fireEvent.change(passwordField, { target: { name: "password", value: "123456789" } });

		const loginButton = screen.getByLabelText("loginButton");
		act(() => fireEvent.click(loginButton));

		await waitFor(() => {
			expect(mockStartLoginWithEmailPassword).toHaveBeenCalled();
		});
	});

	it("should switch to <RegisterForm />", () => {
		const { store } = renderWithProviders(<LoginForm />, { preloadedState });

		const signUpLink = screen.getByLabelText("signUpLink");
		fireEvent.click(signUpLink);

		expect(store.getState().ui.isOpenLoginModal).toBeFalsy();
		expect(store.getState().ui.isOpenRegisterModal).toBeTruthy();
	});

	it("should show invalid email message", () => {
		const emailErrorMessage = "Invalid email";
		renderWithProviders(<LoginForm />, { preloadedState });

		const loginButton = screen.getByLabelText("loginButton");
		fireEvent.click(loginButton);

		expect(screen.getAllByText(emailErrorMessage).length).toBeGreaterThanOrEqual(1);
	});

	it("should show pasword error message", () => {
		const passwordErrorMessage = "Enter your password";
		renderWithProviders(<LoginForm />, { preloadedState });

		const userEmail = "user@mail.com";
		const emailField = screen.getByRole("textbox", { name: "Email:" });
		fireEvent.change(emailField, { target: { name: "email", value: userEmail } });

		const loginButton = screen.getByLabelText("loginButton");
		fireEvent.click(loginButton);

		expect(screen.getAllByText(passwordErrorMessage).length).toBeGreaterThanOrEqual(1);
	});

	it("should close modal", () => {
		const { store } = renderWithProviders(<LoginForm />, { preloadedState });

		const closeButton = screen.getByLabelText("closeButton");
		fireEvent.click(closeButton);

		expect(store.getState().ui.isOpenLoginModal).toBeFalsy();
	});
});
