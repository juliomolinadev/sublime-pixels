import React from "react";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

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
	test("should render component", () => {
		renderWithProviders(<LoginForm />, { preloadedState });

		expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
	});

	test("should call startLoginWithEmailPassword", () => {
		renderWithProviders(<LoginForm />, { preloadedState });

		const userEmail = "user@mail.com";
		const emailField = screen.getByRole("textbox", { name: "Email:" });
		fireEvent.change(emailField, { target: { name: "email", value: userEmail } });

		const userPassword = "123456789";
		const passwordField = screen.getByLabelText("passwordInput");
		fireEvent.change(passwordField, { target: { name: "password", value: userPassword } });

		const loginButton = screen.getByLabelText("loginButton");
		fireEvent.click(loginButton);

		expect(mockStartLoginWithEmailPassword).toHaveBeenCalled();
	});

	test("should switch to <RegisterForm />", () => {
		const { store } = renderWithProviders(<LoginForm />, { preloadedState });

		const signUpLink = screen.getByLabelText("signUpLink");
		fireEvent.click(signUpLink);

		expect(store.getState().ui.isOpenLoginModal).toBeFalsy();
		expect(store.getState().ui.isOpenRegisterModal).toBeTruthy();
	});

	test("should show invalid email message", () => {
		const emailErrorMessage = "Invalid email";
		renderWithProviders(<LoginForm />, { preloadedState });

		const loginButton = screen.getByLabelText("loginButton");
		fireEvent.click(loginButton);

		expect(screen.getAllByText(emailErrorMessage).length).toBeGreaterThanOrEqual(1);
	});

	test("should show pasword error message", () => {
		const passwordErrorMessage = "Enter your password";
		renderWithProviders(<LoginForm />, { preloadedState });

		const userEmail = "user@mail.com";
		const emailField = screen.getByRole("textbox", { name: "Email:" });
		fireEvent.change(emailField, { target: { name: "email", value: userEmail } });

		const loginButton = screen.getByLabelText("loginButton");
		fireEvent.click(loginButton);

		expect(screen.getAllByText(passwordErrorMessage).length).toBeGreaterThanOrEqual(1);
	});
});
