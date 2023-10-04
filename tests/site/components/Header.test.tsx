import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { Header } from "../../../src/site/components/Header";
import { batchesNewBatchesArray } from "../../fixtures";

const preloadedState = {
	batches: batchesNewBatchesArray,
};

describe("<Batch /> tests", () => {
	it("should render component", () => {
		renderWithProviders(<Header />, { preloadedState });

		expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
	});
});
