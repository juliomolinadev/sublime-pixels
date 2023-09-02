import { describe, expect, test, vi } from "vitest";
import { startLogout } from "../../../../src/store/auth/thunks/startLogout";
import { logoutFirebase } from "../../../../src/firebase/firebaseProviders";
import { logout } from "../../../../src/store/auth";

vi.mock("../../../../src/firebase/firebaseProviders");

describe("startLogout thunk tests", () => {
	const dispatch = vi.fn();

	test("should call logoutFirebase and logout", async () => {
		await startLogout()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(logout(null));
	});
});
