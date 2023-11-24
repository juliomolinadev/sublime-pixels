import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateBatchJSON } from "../../../src/site/helpers/validateBatchJSON";

describe("validateBatchJSON() tests", () => {
	const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

	beforeEach(() => {
		consoleMock.mockReset();
	});

	it('should print "no info error"', () => {
		const batch = {};
		const isValidBatch = validateBatchJSON(batch);

		expect(consoleMock).toHaveBeenLastCalledWith("Batch info is required");
		expect(isValidBatch).toBe(false);
	});

	it('should print "batch id error" without id', () => {
		const batch = {
			info: { id: "" },
		};

		const isValidBatch = validateBatchJSON(batch);

		expect(consoleMock).toHaveBeenLastCalledWith("Batch id is required");
		expect(isValidBatch).toBe(false);
	});

	it('should print "name error" without batch name', () => {
		const batch = {
			info: { id: "1", downloadables: 1 },
		};

		const isValidBatch = validateBatchJSON(batch);

		expect(consoleMock).toHaveBeenLastCalledWith("Batch name is required");
		expect(isValidBatch).toBe(false);
	});

	it('should print "No items error" without items', () => {
		const batch = {
			info: { id: "1", downloadables: 1, name: "test batch" },
			items: [],
		};
		const isValidBatch = validateBatchJSON(batch);

		expect(consoleMock).toHaveBeenLastCalledWith("Items are required");
		expect(isValidBatch).toBe(false);
	});

	it("should return true without print anything", () => {
		const batch = {
			info: { id: "1", downloadables: 1, name: "test batch" },
			items: [
				{
					id: "1",
					img: "https://.jpg",
					title: "Test title",
					buyLink: "https://testLink.com",
					fileLinks: ["https://fileLink.com"],
				},
			],
		};
		const isValidBatch = validateBatchJSON(batch);

		expect(consoleMock).toHaveBeenCalledTimes(0);
		expect(isValidBatch).toBe(true);
	});
});
