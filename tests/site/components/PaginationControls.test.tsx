import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { PaginationControls } from "../../../src/site/components/PaginationControls";
import { batchesNewBatchesArray } from "../../fixtures";

const preloadedState = {
	batches: batchesNewBatchesArray,
};

describe("<PaginationControls /> tests", () => {
	it("should render component", () => {
		renderWithProviders(<PaginationControls />, { preloadedState });

		expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
	});
});
