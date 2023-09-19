import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test-utils";
import { Batch } from "../../../src/site/components/Batch";

describe("<Batch /> tests", () => {
	it("should render component", () => {
		renderWithProviders(<Batch />);

		// expect(screen.getAllByText("Product title").length).toBeGreaterThan(0);
	});
});
