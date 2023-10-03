import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePagination } from "../../src/hooks/usePagination";

const batches = ["10", "9", "8", "7", "6", "5", "4", "3", "2"];

describe("usePagination tests", () => {
	it("should return default values", () => {
		const shortBatches = ["3", "2"];
		const { result } = renderHook(() => usePagination(shortBatches));

		expect(result.current.visibleBatches).toEqual(shortBatches);
	});

	it("should show the first 5 batches", () => {
		const { result } = renderHook(() => usePagination(batches));

		expect(result.current.visibleBatches).toEqual(["10", "9", "8", "7", "6"]);
	});

	it("should move one position to the right", () => {
		const { result } = renderHook(() => usePagination(batches));
		const { onMoveOne } = result.current;

		act(() => {
			onMoveOne(1);
		});

		expect(result.current.visibleBatches).toEqual(["9", "8", "7", "6", "5"]);
	});

	it("should move one position to the left", () => {
		const { result } = renderHook(() => usePagination(batches));

		const { onMoveEnd } = result.current;
		act(() => {
			onMoveEnd();
		});

		const { onMoveOne } = result.current;
		act(() => {
			onMoveOne(-1);
		});

		expect(result.current.visibleBatches).toEqual(["7", "6", "5", "4", "3"]);
	});

	it("should move to the end", () => {
		const { result } = renderHook(() => usePagination(batches));
		const { onMoveEnd } = result.current;

		act(() => {
			onMoveEnd();
		});

		expect(result.current.visibleBatches).toEqual(["6", "5", "4", "3", "2"]);
	});

	it("should move to the start", () => {
		const { result } = renderHook(() => usePagination(batches));

		const { onMoveOne } = result.current;
		act(() => {
			onMoveOne(1);
		});

		const { onMoveStart } = result.current;
		act(() => {
			onMoveStart();
		});

		expect(result.current.visibleBatches).toEqual(["10", "9", "8", "7", "6"]);
	});
});
