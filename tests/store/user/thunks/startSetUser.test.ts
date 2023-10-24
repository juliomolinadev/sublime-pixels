import { beforeEach, describe, expect, it, vi } from "vitest";
import { readDocFromFirestore } from "../../../../src/firebase/firestoreCRUD";
import { startSetUser } from "../../../../src/store/user/thunks/startSetUser";
import { DocumentData, DocumentReference, SnapshotMetadata } from "firebase/firestore";
import { setUser } from "../../../../src/store/user";

vi.mock("../../../../src/firebase/firestoreCRUD/readDocFromFirestore");

describe("startSetUser thunk tests", () => {
	const dispatch = vi.fn();

	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should return false if user not exists", async () => {
		vi.mocked(readDocFromFirestore).mockResolvedValue(false);
		const userId = "1";

		const response = await startSetUser(userId)(dispatch);

		expect(dispatch).toHaveBeenCalledTimes(0);
		expect(response).toBeFalsy();
	});

	it("should call dispatch with setUser", async () => {
		const user = {
			uid: "1",
			downloads: [],
			likes: [],
			dislikes: [],
		};

		const userResponse = {
			metadata: <SnapshotMetadata>{},
			exists: () => {},
			get: () => {},
			id: "1",
			ref: <DocumentReference<DocumentData, DocumentData>>{},
			data: (): DocumentData => user,
		};

		vi.mocked(readDocFromFirestore).mockResolvedValue(userResponse);

		const response = await startSetUser(user.uid)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(setUser(user));
		expect(response).toBeTruthy();
	});
});
