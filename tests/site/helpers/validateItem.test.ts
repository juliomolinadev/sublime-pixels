import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateItem } from "../../../src/site/helpers/validateItem";

describe("validateItem() tests", () => {
	const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

	beforeEach(() => {
		consoleMock.mockReset();
	});

	it('should print "item id error" without id', () => {
		const item = { id: "" };

		const isValidItem = validateItem(item);

		expect(consoleMock).toHaveBeenLastCalledWith("Item id is required");
		expect(isValidItem).toBe(false);
	});

	it('should print "item img error" with invalid img link', () => {
		const item = { id: "1", img: ".png" };

		const isValidItem = validateItem(item);

		expect(consoleMock).toHaveBeenLastCalledWith("Item image link is required");
		expect(isValidItem).toBe(false);
	});

	it('should print "item title error" without title', () => {
		const item = { id: "1", img: "https://.jpg", title: "" };

		const isValidItem = validateItem(item);

		expect(consoleMock).toHaveBeenLastCalledWith("Item title is required");
		expect(isValidItem).toBe(false);
	});

	it('should print "item buy link error" with invalid buy link', () => {
		const item = { id: "1", img: "https://.jpg", title: "Test title", buyLink: "" };

		const isValidItem = validateItem(item);

		expect(consoleMock).toHaveBeenLastCalledWith("Item buy link is required");
		expect(isValidItem).toBe(false);
	});

	it('should print "item download links error" without download links', () => {
		const item = {
			id: "1",
			img: "https://.jpg",
			title: "Test title",
			buyLink: "https://testLink.com",
			fileLinks: [],
		};

		const isValidItem = validateItem(item);

		expect(consoleMock).toHaveBeenLastCalledWith("Item file links are required");
		expect(isValidItem).toBe(false);
	});

	it('should print "item download links error" with invalid download links', () => {
		const item = {
			id: "1",
			img: "https://.jpg",
			title: "Test title",
			buyLink: "https://testLink.com",
			fileLinks: [""],
		};

		const isValidItem = validateItem(item);

		expect(consoleMock).toHaveBeenLastCalledWith("Valid item file links are required");
		expect(isValidItem).toBe(false);
	});

	it("should return true without print anything", () => {
		const item = {
			id: "1",
			img: "https://.jpg",
			title: "Test title",
			buyLink: "https://testLink.com",
			fileLinks: ["https://fileLink.com"],
		};

		const isValidItem = validateItem(item);

		expect(consoleMock).toHaveBeenCalledTimes(0);
		expect(isValidItem).toBe(true);
	});
});
