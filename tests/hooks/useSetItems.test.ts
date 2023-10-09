import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { getStoreWrapper } from "../utils/test-utils";
import { useSetItems } from "../../src/hooks/useSetItems";

const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

vi.mock("../../src/hooks/storeHooks", async () => {
	const actual = await vi.importActual("../../src/hooks/storeHooks");
	return {
		...(actual as object),

		useTypedDispatch: vi.fn().mockImplementation(
			() =>
				(message: string): void =>
					console.log(message),
		),
	};
});

const batchArrayMessage = "seting batch array";
const batchMessage = "seting batch";
const itemsMessage = "seting items";

vi.mock("../../src/store/batches/thunks/starSetBatchesArray", async () => {
	const actual = await vi.importActual("../../src/store/batches/thunks/starSetBatchesArray");
	return {
		...(actual as object),
		startSetBatchesArray: vi.fn().mockImplementation(() => batchArrayMessage),
	};
});

vi.mock("../../src/store/batches/thunks/startAddBatch", async () => {
	const actual = await vi.importActual("../../src/store/batches/thunks/startAddBatch");
	return {
		...(actual as object),
		startAddBatch: vi.fn().mockImplementation(() => batchMessage),
	};
});

vi.mock("../../src/store/items/thunks/startSetItems", async () => {
	const actual = await vi.importActual("../../src/store/items/thunks/startSetItems");
	return {
		...(actual as object),
		startSetItems: vi.fn().mockImplementation(() => itemsMessage),
	};
});

const preloadedState = {
	auth: {
		status: "autenticated",
	},

	batches: {
		batches: {},
		activeBatch: "1",
	},
};
const { wrapper } = getStoreWrapper(preloadedState);

describe("useSetItems tests", () => {
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	it("should dispatch startSetBatchesArray", async () => {
		renderHook(() => useSetItems(), { wrapper });

		expect(consoleMock).toHaveBeenNthCalledWith(1, batchArrayMessage);
	});

	it("should dispatch startAddBatch", async () => {
		renderHook(() => useSetItems(), { wrapper });

		expect(consoleMock).toHaveBeenNthCalledWith(2, batchMessage);
	});

	it("should dispatch startSetItems", async () => {
		renderHook(() => useSetItems(), { wrapper });

		expect(consoleMock).toHaveBeenNthCalledWith(3, itemsMessage);
	});
});
