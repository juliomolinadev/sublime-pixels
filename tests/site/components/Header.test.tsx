import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test-utils";
import { Header } from "../../../src/site/components/Header";

describe("<Batch /> tests", () => {
	it("should render component", () => {
		renderWithProviders(<Header />);

		expect(screen.getByText(/Batch:/i)).toBeInTheDocument();
	});
});
