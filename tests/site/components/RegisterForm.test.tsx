import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test-utils";
import { RegisterForm } from "../../../src/site/components/RegisterForm";
import { openRegisterModalState } from "../../fixtures/uiFixtures";
import { formErrorMessages } from "../../../src/assets/errorMessages";

import "@testing-library/jest-dom";
import { LoginForm } from "../../../src/site/components/LoginForm";

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

		expect(screen.getByRole("heading", { name: /Signup/i })).toBeInTheDocument();
	});

	it("should call startCreatingUserWithEmailPassword", async () => {
		const user = userEvent.setup();

		renderWithProviders(<RegisterForm />, { preloadedState });

		const nameField = screen.getByRole("textbox", { name: "Name:" });
		await user.type(nameField, "user@mail.com");

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		await user.type(emailField, "user@mail.com");

		const passwordField = screen.getByLabelText("Password:");
		await user.type(passwordField, "123456789");

		const passwordField2 = screen.getByLabelText("Confirm password:");
		await user.type(passwordField2, "123456789");

		const loginButton = screen.getByRole("button", { name: /submit/i });
		await user.click(loginButton);

		await waitFor(() => {
			expect(mockStartCreatingUserWithEmailPassword).toHaveBeenCalled();
		});
	});

	it("should switch to <LoginForm />", async () => {
		const user = userEvent.setup();

		renderWithProviders(
			<>
				<RegisterForm /> <LoginForm />
			</>,
			{ preloadedState },
		);

		const signUpLink = screen.getByText("Login here");
		await user.click(signUpLink);

		expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: /Signup/i })).not.toBeInTheDocument();
	});

	it("should show name error message", async () => {
		const user = userEvent.setup();

		renderWithProviders(<RegisterForm />, { preloadedState });

		const loginButton = screen.getByRole("button", { name: /submit/i });
		await user.click(loginButton);

		expect(screen.getByText(formErrorMessages.userNameError)).toBeInTheDocument();
	});

	it("should show invalid email message", async () => {
		const user = userEvent.setup();

		renderWithProviders(<RegisterForm />, { preloadedState });

		const nameField = screen.getByRole("textbox", { name: "Name:" });
		await user.type(nameField, "user@mail.com");

		const loginButton = screen.getByRole("button", { name: /submit/i });
		await user.click(loginButton);

		expect(screen.getByText(formErrorMessages.emailError)).toBeInTheDocument();
	});

	it("should show invalid password message", async () => {
		const user = userEvent.setup();

		renderWithProviders(<RegisterForm />, { preloadedState });

		const nameField = screen.getByRole("textbox", { name: "Name:" });
		await user.type(nameField, "user@mail.com");

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		await user.type(emailField, "user@mail.com");

		const loginButton = screen.getByRole("button", { name: /submit/i });
		await user.click(loginButton);

		expect(screen.getByText(formErrorMessages.shortPasswordError)).toBeInTheDocument();
	});

	it("should show confirm password error message", async () => {
		const user = userEvent.setup();

		renderWithProviders(<RegisterForm />, { preloadedState });

		const nameField = screen.getByRole("textbox", { name: "Name:" });
		await user.type(nameField, "user@mail.com");

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		await user.type(emailField, "user@mail.com");

		const passwordField = screen.getByLabelText("Password:");
		await user.type(passwordField, "123456789");

		const loginButton = screen.getByRole("button", { name: /submit/i });
		await user.click(loginButton);

		expect(screen.getByText(formErrorMessages.confirmPasswordError)).toBeInTheDocument();
	});

	it("should close modal", async () => {
		const user = userEvent.setup();

		renderWithProviders(<RegisterForm />, { preloadedState });

		const closeButton = screen.getByRole("button", { name: /x/i });
		await user.click(closeButton);

		expect(screen.queryByRole("heading", { name: /Signup/i })).not.toBeInTheDocument();
	});
});
