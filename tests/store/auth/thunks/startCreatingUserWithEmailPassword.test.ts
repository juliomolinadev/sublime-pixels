import { beforeEach, describe, expect, test, vi } from "vitest";
import { demoUser } from "../../../fixtures/authFixtures";
import { registerUserWithEmailPassword } from "../../../../src/firebase/firebaseProviders";
import {
	checkingCredentials,
	login,
	logout,
	startCreatingUserWithEmailPassword,
} from "../../../../src/store/auth";
import { authResponsesMessages, uiErrorMessages } from "../../../../src/assets/errorMessages";
import { setUiErrorMessage } from "../../../../src/store/ui";

vi.mock("../../../../src/firebase/firebaseProviders");

describe("startCreatingUserWithEmailPassword thunk tests", () => {
	const dispatch = vi.fn();
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	test("should call checkingCredentials and login (success)", async () => {
		const loginResponse = { ok: true, ...demoUser, authErrorMessage: null };
		const formData = { email: demoUser.email, password: "12345678", displayName: "New User" };

		vi.mocked(registerUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startCreatingUserWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginResponse));
	});

	test("should call checkingCredentials and logout (fail)", async () => {
		const loginResponse = { ok: false, ...demoUser, authErrorMessage: null };
		const formData = { email: demoUser.email, password: "12345678", displayName: "New User" };

		vi.mocked(registerUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startCreatingUserWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(loginResponse.authErrorMessage));
	});

	test("should dispatch network error message", async () => {
		const loginResponse = {
			ok: false,
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			emailVerified: false,
			authErrorMessage: authResponsesMessages.networkError,
		};
		const formData = { email: demoUser.email, password: "12345678", displayName: "New User" };

		vi.mocked(registerUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startCreatingUserWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(setUiErrorMessage(uiErrorMessages.networkError));
	});

	test("should dispatch not available email error message", async () => {
		const loginResponse = {
			ok: false,
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			emailVerified: false,
			authErrorMessage: authResponsesMessages.emailRegistered,
		};
		const formData = { email: demoUser.email, password: "12345678", displayName: "New User" };

		vi.mocked(registerUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startCreatingUserWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(
			setUiErrorMessage(uiErrorMessages.notAvailableEmailError),
		);
	});
});
