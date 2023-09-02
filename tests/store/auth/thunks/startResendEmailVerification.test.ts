import { describe, expect, test, vi } from "vitest";
import { resendEmailVerification } from "../../../../src/firebase/firebaseProviders";
import { startResendEmailVerification } from "../../../../src/store/auth/thunks/startResendEmailVerification";
import { switchLoadingState } from "../../../../src/store/ui";

vi.mock("../../../../src/firebase/firebaseProviders");

describe("startResendEmailVerification thunk tests", () => {
	const dispatch = vi.fn();

	test("should call resendEmailVerification and switchLoadingState twice", async () => {
		await startResendEmailVerification()(dispatch);

		expect(resendEmailVerification).toHaveBeenCalled();
		expect(dispatch).toHaveBeenNthCalledWith(1, switchLoadingState());
		expect(dispatch).toHaveBeenNthCalledWith(2, switchLoadingState());
	});
});
