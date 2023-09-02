import { beforeEach, describe, expect, test, vi } from "vitest";
import { demoUser } from "../../../fixtures/authFixtures";
import { loginUserWithEmailPassword } from "../../../../src/firebase/firebaseProviders";
import {
	checkingCredentials,
	login,
	logout,
	startLoginWithEmailPassword,
} from "../../../../src/store/auth";

vi.mock("../../../../src/firebase/firebaseProviders");

describe("startLoginWithEmailPassword thunk tests", () => {
	const dispatch = vi.fn();
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	test("should call checkingCredentials and login (success)", async () => {
		const loginResponse = { ok: true, ...demoUser, authErrorMessage: null };
		const formData = { email: demoUser.email, password: "12345678" };

		await loginUserWithEmailPassword.mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginResponse));
	});

	test("should call checkingCredentials and logout (fail)", async () => {
		const loginResponse = { ok: false, authErrorMessage: "Auth error" };
		const formData = { email: demoUser.email, password: "12345678" };

		await loginUserWithEmailPassword.mockResolvedValue(loginResponse);
		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(loginResponse.authErrorMessage));
	});
});
