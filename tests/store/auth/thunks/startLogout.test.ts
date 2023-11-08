import { describe, expect, test, vi } from "vitest";
import { startLogout } from "../../../../src/store/auth/thunks/startLogout";
import { logoutFirebase } from "../../../../src/firebase/firebaseProviders";
import { logout } from "../../../../src/store/auth";
import { resetUser } from "../../../../src/store/user";

vi.mock("../../../../src/firebase/firebaseProviders");

describe("startLogout thunk tests", () => {
	const dispatch = vi.fn();

	test("should call logoutFirebase and logout", async () => {
		await startLogout()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenNthCalledWith(1, logout(null));
		expect(dispatch).toHaveBeenNthCalledWith(2, resetUser());
	});
});
