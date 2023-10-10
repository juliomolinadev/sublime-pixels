import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import { useCheckAuth } from "../../src/hooks/useCheckAuth";

import { getStoreWrapper } from "../utils/test-utils";

// const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

vi.mock("../../src/hooks/storeHooks", async () => {
	const actual = await vi.importActual("../../src/hooks/storeHooks");
	return {
		...(actual as object),

		useTypedDispatch: vi.fn().mockImplementation(
			() =>
				(message: string): void =>
					console.log(message),
		),
	};
});

const logoutMessage = "Logout user";

vi.mock("firebase/auth");

vi.mock("../../src/store/auth/authSlice.ts", async () => {
	const actual = await vi.importActual("../../src/store/auth/authSlice.ts");
	return {
		...(actual as object),
		logout: vi.fn().mockImplementation(() => logoutMessage),
	};
});

describe("useCheckAuth tests", () => {
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should dispatch logout", async () => {
		vi.mocked(onAuthStateChanged).mockResolvedValue(false as unknown as Unsubscribe);

		const preloadedState = {
			auth: {},
		};

		const { wrapper } = getStoreWrapper(preloadedState);
		const { result } = renderHook(() => useCheckAuth(), { wrapper });

		// console.log(result.current);

		// expect(consoleMock).toHaveBeenCalledWith(logoutMessage);
	});
});
