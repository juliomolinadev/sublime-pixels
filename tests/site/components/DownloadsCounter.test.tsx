import React from "react";
import { describe, it } from "vitest";
import { screen } from "@testing-library/react";

import { DownloadsCounter } from "../../../src/site/components/DownloadsCounter";
import { renderWithProviders } from "../../utils/test-utils";
import { expect } from "vitest";

const preloadedState = {
	batches: {
		batches: {
			3: {
				downloadables: 1,
				id: "3",
				name: "Test Batch",
			},
		},
		activeBatch: "3",
		batchesArray: ["3"],
	},

	items: {
		items: [],
		currentItems: {},
		currentItemIds: ["1", "2", "3"],
	},

	user: {
		uid: "1",
		likes: [],
		dislikes: [],
		downloads: ["1"],
	},
};

describe("<DownloadsCounter/>", () => {
	it("should render component with 0 in counter", () => {
		renderWithProviders(<DownloadsCounter />, { preloadedState });

		expect(screen.getByText("0")).toBeInTheDocument();
	});
});
