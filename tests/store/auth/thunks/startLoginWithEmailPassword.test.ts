import { beforeEach, describe, expect, test, vi } from "vitest";
import { demoUser } from "../../../fixtures/authFixtures";
import { loginUserWithEmailPassword } from "../../../../src/firebase/firebaseProviders";
import {
	checkingCredentials,
	login,
	logout,
	startLoginWithEmailPassword,
} from "../../../../src/store/auth";
import { setUiErrorMessage } from "../../../../src/store/ui";
import { authResponsesMessages, uiErrorMessages } from "../../../../src/assets/errorMessages";

vi.mock("../../../../src/firebase/firebaseProviders");

describe("startLoginWithEmailPassword thunk tests", () => {
	const dispatch = vi.fn();
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	test("should call checkingCredentials and login (success)", async () => {
		const loginResponse = { ok: true, ...demoUser, authErrorMessage: null };
		const formData = { email: demoUser.email, password: "12345678" };

		vi.mocked(loginUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginResponse));
	});

	test("should call checkingCredentials and logout (fail)", async () => {
		const loginResponse = { ok: false, ...demoUser, authErrorMessage: null };
		const formData = { email: demoUser.email, password: "12345678" };

		vi.mocked(loginUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(loginResponse.authErrorMessage));
	});

	test("should dispatch credentials error message (wrong email case)", async () => {
		const loginResponse = {
			ok: false,
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			emailVerified: false,
			authErrorMessage: authResponsesMessages.emailError,
		};
		const formData = { email: demoUser.email, password: "12345678" };

		vi.mocked(loginUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(setUiErrorMessage(uiErrorMessages.credentialError));
	});

	test("should dispatch credentials error message (wrong password case)", async () => {
		const loginResponse = {
			ok: false,
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			emailVerified: false,
			authErrorMessage: authResponsesMessages.passwordError,
		};
		const formData = { email: demoUser.email, password: "12345678" };

		vi.mocked(loginUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(setUiErrorMessage(uiErrorMessages.credentialError));
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
		const formData = { email: demoUser.email, password: "12345678" };

		vi.mocked(loginUserWithEmailPassword).mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(setUiErrorMessage(uiErrorMessages.networkError));
	});
});
