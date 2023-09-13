import { beforeEach, describe, expect, test, vi } from "vitest";
import { demoUser } from "../../../fixtures/authFixtures";
import { signInWithGoogle } from "../../../../src/firebase/firebaseProviders";
import { checkingCredentials, login, logout, startGoogleSignIn } from "../../../../src/store/auth";

vi.mock("../../../../src/firebase/firebaseProviders");

describe("startGoogleSignIn thunk tests", () => {
	const dispatch = vi.fn();

	beforeEach(async () => {
		vi.clearAllMocks();
	});

	test("should call checkingCredentials and login (success)", async () => {
		const loginResponse = { ok: true, ...demoUser, authErrorMessage: null };

		vi.mocked(signInWithGoogle).mockResolvedValue(loginResponse);
		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginResponse));
	});

	test("should call checkingCredentials and logout (fail)", async () => {
		const loginResponse = { ok: false, ...demoUser, authErrorMessage: null };

		vi.mocked(signInWithGoogle).mockResolvedValue(loginResponse);
		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(null));
	});
});
