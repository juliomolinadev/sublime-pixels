import { describe, expect, test, vi } from "vitest";
import { checkingAuthentication, checkingCredentials } from "../../../../src/store/auth";

vi.mock("../../../../src/firebase/firebaseProviders");

describe("checkingAuthentication thunk tests", () => {
	const dispatch = vi.fn();

	test("should call checkingCredentials", async () => {
		await checkingAuthentication()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
	});
});
