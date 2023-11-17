import { beforeEach, describe, expect, it, vi } from "vitest";
import { updateDocInFirestore } from "../../../../src/firebase/firestoreCRUD";
import { startIncreaseBuyLinkCounter } from "../../../../src/store/user/thunks/startIncreaseBuyLinkCounter";
import { incrementBuyLinkCounter } from "../../../../src/store/items";

vi.mock("../../../../src/firebase/firestoreCRUD/updateDocOnFirestore");

describe("startIncreaseBuyLinkCounter thunk tests", () => {
	const dispatch = vi.fn();
	vi.mocked(updateDocInFirestore).mockResolvedValue(true);

	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should call dispatch with incrementBuyLinkCounter", async () => {
		const itemId = "2";
		const response = await startIncreaseBuyLinkCounter(itemId)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(incrementBuyLinkCounter(itemId));
		expect(response).toBeTruthy();
	});
});
