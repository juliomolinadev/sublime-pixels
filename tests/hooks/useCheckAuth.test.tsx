import React from "react";
import { beforeEach, describe, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Unsubscribe, onAuthStateChanged, getAuth } from "firebase/auth";
import { useCheckAuth } from "../../src/hooks/useCheckAuth";
import { Provider } from "react-redux";
import { setupStore } from "../utils/setupStore";
import {
	authInitialState,
	authenticatedState,
	notAuthenticatedState,
} from "../fixtures/authFixtures";

const mockOnAuthStateChanged = vi.fn();
vi.mock("firebase/auth", async () => {
	const actual = await vi.importActual("firebase/auth");
	return { ...(actual as object), onAuthStateChanged: () => mockOnAuthStateChanged };
});

describe("useCheckAuth tests", () => {
	// const dispatch = vi.fn();

	// beforeEach(async () => {
	// 	vi.clearAllMocks();
	// });

	it("should first", async () => {
		// const preloadedState = {
		// 	auth: authInitialState,
		// };
		// vi.mocked(mockOnAuthStateChanged).mockResolvedValue(authenticatedState);
		// const store = setupStore(preloadedState);
		// const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
		// const { result, rerender } = renderHook(() => useCheckAuth(), { wrapper });
		// await waitFor(() => {
		// 	console.log(result);
		// 	console.log(store.getState());
		// });
		// await waitFor(() => {
		// 	rerender();
		// });
		// console.log(result);
		// console.log(store.getState());
	});
});
