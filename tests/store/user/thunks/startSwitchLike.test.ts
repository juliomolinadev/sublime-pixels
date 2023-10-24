import { beforeEach, describe, expect, it, vi } from "vitest";
import { startSwitchLike } from "../../../../src/store/user/thunks/startSwitchLike";
import { addLike, removeLike } from "../../../../src/store/user";
import { updateDocInFirestore } from "../../../../src/firebase/firestoreCRUD";

vi.mock("../../../../src/firebase/firestoreCRUD/updateDocOnFirestore");

describe("startSwitchLike thunk tests", () => {
	const dispatch = vi.fn();
	vi.mocked(updateDocInFirestore).mockResolvedValue(true);

	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should return without call dispatch", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: null,
			},
		}));

		const response = await startSwitchLike("1")(dispatch, getState);

		expect(dispatch).toHaveBeenCalledTimes(0);
		expect(response).toBeFalsy();
	});

	it("should call dispatch with removeLike", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: ["1"],
			},
		}));

		const itemId = "1";

		const response = await startSwitchLike(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(removeLike(itemId));
		expect(response).toBeTruthy();
	});

	it("should call dispatch with addLike", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: ["1"],
			},
		}));

		const itemId = "2";

		const response = await startSwitchLike(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(addLike(itemId));
		expect(response).toBeTruthy();
	});
});
