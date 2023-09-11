import React from "react";
import { beforeEach, describe, expect, it, vi, test } from "vitest";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test-utils";
import { RegisterForm } from "../../../src/site/components/RegisterForm";
import { openRegisterModalState } from "../../fixtures/uiFixtures";
import { formErrorMessages } from "../../../src/assets/errorMessages";

const mockStartCreatingUserWithEmailPassword = vi.fn();
vi.mock("../../../src/store/auth/thunks/startCreatingUserWithEmailPassword", () => ({
	startCreatingUserWithEmailPassword: () => mockStartCreatingUserWithEmailPassword,
}));

const preloadedState = {
	ui: openRegisterModalState,
};

describe("<RegisterForm /> tests", () => {
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should render component", () => {
		renderWithProviders(<RegisterForm />, { preloadedState });

		expect(screen.getAllByText("Signup").length).toBeGreaterThanOrEqual(1);
	});

	it("should call startCreatingUserWithEmailPassword", async () => {
		renderWithProviders(<RegisterForm />, { preloadedState });

		const nameField = screen.getByRole("textbox", { name: "Name:" });
		fireEvent.change(nameField, { target: { name: "name", value: "user@mail.com" } });

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		fireEvent.change(emailField, { target: { name: "email", value: "user@mail.com" } });

		const passwordField = screen.getByLabelText("passwordInput");
		fireEvent.change(passwordField, { target: { name: "password", value: "123456789" } });

		const passwordField2 = screen.getByLabelText("passwordInput2");
		fireEvent.change(passwordField2, { target: { name: "password2", value: "123456789" } });

		const loginButton = screen.getByLabelText("registerButton");
		act(() => fireEvent.click(loginButton));

		await waitFor(() => {
			expect(mockStartCreatingUserWithEmailPassword).toHaveBeenCalled();
		});
	});

	it("should switch to <LoginForm />", () => {
		const { store } = renderWithProviders(<RegisterForm />, { preloadedState });

		const signUpLink = screen.getByLabelText("loginLink");
		fireEvent.click(signUpLink);

		expect(store.getState().ui.isOpenRegisterModal).toBeFalsy();
		expect(store.getState().ui.isOpenLoginModal).toBeTruthy();
	});

	it("should show name error message", () => {
		renderWithProviders(<RegisterForm />, { preloadedState });

		const loginButton = screen.getByLabelText("registerButton");
		fireEvent.click(loginButton);

		expect(screen.getAllByText(formErrorMessages.userNameError).length).toBeGreaterThanOrEqual(1);
	});

	it("should show invalid email message", () => {
		renderWithProviders(<RegisterForm />, { preloadedState });

		const nameField = screen.getByRole("textbox", { name: "Name:" });
		fireEvent.change(nameField, { target: { name: "name", value: "user@mail.com" } });

		const loginButton = screen.getByLabelText("registerButton");
		fireEvent.click(loginButton);

		expect(screen.getAllByText(formErrorMessages.emailError).length).toBeGreaterThanOrEqual(1);
	});

	it("should show invalid password message", () => {
		renderWithProviders(<RegisterForm />, { preloadedState });

		const nameField = screen.getByRole("textbox", { name: "Name:" });
		fireEvent.change(nameField, { target: { name: "name", value: "user@mail.com" } });

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		fireEvent.change(emailField, { target: { name: "email", value: "user@mail.com" } });

		const loginButton = screen.getByLabelText("registerButton");
		fireEvent.click(loginButton);

		expect(screen.getAllByText(formErrorMessages.shortPasswordError).length).toBeGreaterThanOrEqual(
			1,
		);
	});

	it("should show confirm password error message", () => {
		renderWithProviders(<RegisterForm />, { preloadedState });

		const nameField = screen.getByRole("textbox", { name: "Name:" });
		fireEvent.change(nameField, { target: { name: "name", value: "user@mail.com" } });

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		fireEvent.change(emailField, { target: { name: "email", value: "user@mail.com" } });

		const passwordField = screen.getByLabelText("passwordInput");
		fireEvent.change(passwordField, { target: { name: "password", value: "123456789" } });

		const loginButton = screen.getByLabelText("registerButton");
		fireEvent.click(loginButton);

		expect(
			screen.getAllByText(formErrorMessages.confirmPasswordError).length,
		).toBeGreaterThanOrEqual(1);
	});

	it("should close modal", () => {
		const { store } = renderWithProviders(<RegisterForm />, { preloadedState });

		const closeButton = screen.getByLabelText("closeButton");
		fireEvent.click(closeButton);

		expect(store.getState().ui.isOpenLoginModal).toBeFalsy();
	});
});
