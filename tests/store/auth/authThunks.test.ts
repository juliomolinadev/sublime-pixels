import { beforeEach, describe, expect, it, vi } from "vitest";

import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
	checkingAuthentication,
	startCreatingUserWithEmailPassword,
	startGoogleSignIn,
	startLoginWithEmailPassword,
	startLogout,
	startResendEmailVerification,
} from "../../../src/store/auth/authThunks";
import { demoUser } from "../../fixtures/authFixtures";
import {
	loginUserWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	resendEmailVerification,
	signInWithGoogle,
} from "../../../src/firebase/firebaseProviders";
import { switchLoadingState } from "../../../src/store/ui";

vi.mock("../../../src/firebase/firebaseProviders");

describe("authThunks.ts tests", () => {
	const dispatch = vi.fn();
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should call checkingCredentials", async () => {
		await checkingAuthentication()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
	});

	it("should call checkingCredentials and login (startGoogleSignIn success)", async () => {
		const loginResponse = { ok: true, ...demoUser, authErrorMessage: null };

		await signInWithGoogle.mockResolvedValue(loginResponse);
		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginResponse));
	});

	it("should call checkingCredentials and logout (startGoogleSignIn fail)", async () => {
		const loginResponse = { ok: false };

		await signInWithGoogle.mockResolvedValue(loginResponse);
		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(null));
	});

	it("should call checkingCredentials and login (startLoginWithEmailPassword success)", async () => {
		const loginResponse = { ok: true, ...demoUser, authErrorMessage: null };
		const formData = { email: demoUser.email, password: "12345678" };

		await loginUserWithEmailPassword.mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginResponse));
	});

	it("should call checkingCredentials and logout (startLoginWithEmailPassword fail)", async () => {
		const loginResponse = { ok: false, authErrorMessage: "Auth error" };
		const formData = { email: demoUser.email, password: "12345678" };

		await loginUserWithEmailPassword.mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(loginResponse.authErrorMessage));
	});

	it("should call checkingCredentials and login (startCreatingUserWithEmailPassword success)", async () => {
		const loginResponse = { ok: true, ...demoUser, authErrorMessage: null };
		const formData = { email: demoUser.email, password: "12345678", displayName: "New User" };

		await registerUserWithEmailPassword.mockResolvedValue(loginResponse);
		await startCreatingUserWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginResponse));
	});

	it("should call checkingCredentials and logout (startCreatingUserWithEmailPassword fail)", async () => {
		const loginResponse = { ok: false, authErrorMessage: "Auth error" };
		const formData = { email: demoUser.email, password: "12345678", displayName: "New User" };

		await registerUserWithEmailPassword.mockResolvedValue(loginResponse);
		await startCreatingUserWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(loginResponse.authErrorMessage));
	});

	it("should call logoutFirebase and logout (startLogout)", async () => {
		await startLogout()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(logout(null));
	});

	it("should call logoutFirebase and logout (startLogout)", async () => {
		await startResendEmailVerification()(dispatch);

		expect(resendEmailVerification).toHaveBeenCalled();
		expect(dispatch).toHaveBeenNthCalledWith(1, switchLoadingState());
		expect(dispatch).toHaveBeenNthCalledWith(2, switchLoadingState());
	});
});
