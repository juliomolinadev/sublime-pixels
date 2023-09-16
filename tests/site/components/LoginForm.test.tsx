import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { LoginForm } from "../../../src/site/components/LoginForm";
import {
	credentialsErrorLoginModalState,
	networkErrorLoginModalState,
	openLoginModalState,
} from "../../fixtures/uiFixtures";
import { uiErrorMessages } from "../../../src/assets/errorMessages";
import { RegisterForm } from "../../../src/site/components/RegisterForm";

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

		expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
	});

	it("should call startLoginWithEmailPassword", async () => {
		const user = userEvent.setup();

		renderWithProviders(<LoginForm />, { preloadedState });

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		await user.type(emailField, "user@mail.com");

		const passwordField = screen.getByLabelText("Password:");
		await user.type(passwordField, "123456789");

		const loginButton = screen.getByRole("button", { name: /submit/i });
		await user.click(loginButton);

		await waitFor(() => {
			expect(mockStartLoginWithEmailPassword).toHaveBeenCalled();
		});
	});

	it("should switch to <RegisterForm />", async () => {
		const user = userEvent.setup();

		renderWithProviders(
			<>
				<RegisterForm /> <LoginForm />
			</>,
			{ preloadedState },
		);

		const signUpLink = screen.getByText("Sign up here");
		await user.click(signUpLink);

		expect(screen.getByRole("heading", { name: /Signup/i })).toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: /Login/i })).not.toBeInTheDocument();
	});

	it("should show invalid email message", async () => {
		const user = userEvent.setup();

		renderWithProviders(<LoginForm />, { preloadedState });

		const loginButton = screen.getByRole("button", { name: /submit/i });
		await user.click(loginButton);

		expect(screen.getByText(uiErrorMessages.emailError)).toBeInTheDocument();
	});

	it("should show pasword error message", async () => {
		const user = userEvent.setup();

		renderWithProviders(<LoginForm />, { preloadedState });

		const emailField = screen.getByRole("textbox", { name: "Email:" });
		await user.type(emailField, "user@mail.com");

		const loginButton = screen.getByRole("button", { name: /submit/i });
		await user.click(loginButton);

		expect(screen.getByText(uiErrorMessages.passwordError)).toBeInTheDocument();
	});

	it("should close modal", async () => {
		const user = userEvent.setup();

		renderWithProviders(<LoginForm />, { preloadedState });

		const closeButton = screen.getByRole("button", { name: /x/i });
		await user.click(closeButton);

		expect(screen.queryByRole("heading", { name: /Login/i })).not.toBeInTheDocument();
	});

	it("should show wrong credentials error message", async () => {
		const user = userEvent.setup();

		const preloadedState = {
			ui: credentialsErrorLoginModalState,
		};
		renderWithProviders(<LoginForm />, { preloadedState });

		expect(screen.getByText(uiErrorMessages.credentialsError)).toBeInTheDocument();
	});

	it("should show wrong network error message", async () => {
		const user = userEvent.setup();

		const preloadedState = {
			ui: networkErrorLoginModalState,
		};
		renderWithProviders(<LoginForm />, { preloadedState });

		expect(screen.getByText(uiErrorMessages.networkError)).toBeInTheDocument();
	});
});
