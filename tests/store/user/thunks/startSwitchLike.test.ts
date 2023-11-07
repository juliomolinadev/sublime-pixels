import { beforeEach, describe, expect, it, vi } from "vitest";
import { startSwitchLike } from "../../../../src/store/user/thunks/startSwitchLike";
import { addLike, removeDislike, removeLike } from "../../../../src/store/user";
import { updateDocInFirestore } from "../../../../src/firebase/firestoreCRUD";
import { decrementDislikes, decrementLikes, incrementLikes } from "../../../../src/store/items";

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

	it("should call dispatch with removeDislike, decrementDislikes, addLike and incrementLikes", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: [],
				dislikes: ["1"],
			},
		}));

		const itemId = "1";

		const response = await startSwitchLike(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenNthCalledWith(1, removeDislike(itemId));
		expect(dispatch).toHaveBeenNthCalledWith(2, decrementDislikes(itemId));
		expect(dispatch).toHaveBeenNthCalledWith(3, addLike(itemId));
		expect(dispatch).toHaveBeenNthCalledWith(4, incrementLikes(itemId));
		expect(response).toBeTruthy();
	});

	it("should call dispatch with removeLike and decrementLikes", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: ["1"],
				dislikes: [],
			},
		}));

		const itemId = "1";

		const response = await startSwitchLike(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenNthCalledWith(1, removeLike(itemId));
		expect(dispatch).toHaveBeenNthCalledWith(2, decrementLikes(itemId));
		expect(response).toBeTruthy();
	});

	it("should call dispatch with addLike and incrementLikes", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "1",
				likes: ["1"],
				dislikes: [],
			},
		}));

		const itemId = "2";

		const response = await startSwitchLike(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenNthCalledWith(1, addLike(itemId));
		expect(dispatch).toHaveBeenNthCalledWith(2, incrementLikes(itemId));
		expect(response).toBeTruthy();
	});
});
