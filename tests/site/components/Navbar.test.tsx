import React from "react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { uiInitialState } from "../../fixtures/uiFixtures";
import { Navbar } from "../../../src/site/components/Navbar";
import { LoginForm } from "../../../src/site/components/LoginForm";
import { authenticatedState, notVerifiedState } from "../../fixtures/authFixtures";

const unlogedState = {
	ui: uiInitialState,
};

const logedState = {
	ui: uiInitialState,
	auth: authenticatedState,
};

const emailNotVerifiedState = {
	ui: uiInitialState,
	auth: notVerifiedState,
};

vi.mock("../../../src/firebase/firebaseProviders", () => ({
	resendEmailVerification: vi.fn(),
	logoutFirebase: vi.fn(),
}));

window.scrollTo = vi.fn(() => {});

describe("<Navbar /> tests", () => {
	it("should render component", () => {
		renderWithProviders(<Navbar />, { preloadedState: unlogedState });

		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("should open login modal", async () => {
		const user = userEvent.setup();

		renderWithProviders(
			<>
				<Navbar />
				<LoginForm />
			</>,

			{ preloadedState: unlogedState },
		);

		const loginButton = screen.getByRole("button", { name: /login/i });
		await user.click(loginButton);

		expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
	});

	it("should show logout button", () => {
		renderWithProviders(<Navbar />, { preloadedState: logedState });

		expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
		expect(screen.queryByText(/Please confirm your email account./)).not.toBeInTheDocument();
	});

	it("should show logout confirmation alert", async () => {
		const user = userEvent.setup();

		renderWithProviders(<Navbar />, { preloadedState: logedState });

		const logoutButton = screen.getByRole("button", { name: /logout/i });
		await user.click(logoutButton);

		expect(screen.getByText("Are you sure you want to log out?")).toBeInTheDocument();
	});

	it("should show confirm email notification", () => {
		renderWithProviders(<Navbar />, { preloadedState: emailNotVerifiedState });
		expect(screen.getByText(/Please confirm your email account./)).toBeInTheDocument();
	});

	it("should show verification email resend notification", async () => {
		const user = userEvent.setup();

		renderWithProviders(<Navbar />, { preloadedState: emailNotVerifiedState });

		const logoutButton = screen.getByText(/resend confirmation email/i);
		await user.click(logoutButton);

		expect(screen.getByText("Verification email has been resent.")).toBeInTheDocument();
	});

	it("should logout", async () => {
		const user = userEvent.setup();

		renderWithProviders(<Navbar />, { preloadedState: logedState });

		const logoutButton = screen.getByRole("button", { name: /logout/i });
		await user.click(logoutButton);

		expect(screen.getByText("Are you sure you want to log out?")).toBeInTheDocument();

		const confirmButton = screen.getByRole("button", { name: /yes/i });
		await user.click(confirmButton);

		expect(screen.queryByText("Logout")).not.toBeInTheDocument();
	});
});
