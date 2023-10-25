import { beforeEach, describe, expect, it, vi } from "vitest";
import { startSwitchDislike } from "../../../../src/store/user/thunks/startSwitchDislike";
import { addDislike, removeDislike, removeLike } from "../../../../src/store/user";
import { updateDocInFirestore } from "../../../../src/firebase/firestoreCRUD";

vi.mock("../../../../src/firebase/firestoreCRUD/updateDocOnFirestore");

describe("startSwitchDislike thunk tests", () => {
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

		const response = await startSwitchDislike("1")(dispatch, getState);

		expect(dispatch).toHaveBeenCalledTimes(0);
		expect(response).toBeFalsy();
	});

	it("should call dispatch with removeLike and addDislike", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: ["1"],
				dislikes: [],
			},
		}));

		const itemId = "1";

		const response = await startSwitchDislike(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenNthCalledWith(1, removeLike(itemId));
		expect(dispatch).toHaveBeenNthCalledWith(2, addDislike(itemId));
		expect(response).toBeTruthy();
	});

	it("should call dispatch with removeDislike", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: [],
				dislikes: ["1"],
			},
		}));

		const itemId = "1";

		const response = await startSwitchDislike(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(removeDislike(itemId));
		expect(response).toBeTruthy();
	});

	it("should call dispatch with addDislike", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: [],
				dislikes: ["1"],
			},
		}));

		const itemId = "2";

		const response = await startSwitchDislike(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(addDislike(itemId));
		expect(response).toBeTruthy();
	});
});
