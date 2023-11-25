import { beforeEach, describe, expect, it, vi } from "vitest";
import { addDownload, decrementFreeDownloads } from "../../../../src/store/user";
import { updateDocInFirestore } from "../../../../src/firebase/firestoreCRUD";
import { startAddDownload } from "../../../../src/store/user/thunks/startAddDownload";
import { startDecrementDownloadsCounter } from "../../../../src/store/user/thunks/startDecrementDownloadsCounter";

vi.mock("../../../../src/firebase/firestoreCRUD/updateDocOnFirestore");

describe("startDecrementDownloadsCounter thunk tests", () => {
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

		const response = await startDecrementDownloadsCounter("1")(dispatch, getState);

		expect(dispatch).toHaveBeenCalledTimes(0);
		expect(response).toBeFalsy();
	});

	it("should return without call dispatch when id is already in downloads", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "123",
				downloads: ["1"],
			},
		}));

		const response = await startDecrementDownloadsCounter("1")(dispatch, getState);

		expect(dispatch).toHaveBeenCalledTimes(0);
		expect(response).toBeFalsy();
	});

	it("should call dispatch with decrementFreeDownload", async () => {
		const getState = vi.fn().mockImplementation(() => ({
			user: {
				uid: "123",
				downloads: ["1"],
			},
		}));

		const itemId = "2";
		const response = await startDecrementDownloadsCounter(itemId)(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(decrementFreeDownloads());
		expect(response).toBeTruthy();
	});
});
