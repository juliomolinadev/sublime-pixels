import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test-utils";
import { Item } from "../../../src/site/components/Item";

describe("<Item /> tests", () => {
	it("should render component", () => {
		renderWithProviders(<Item />);

		expect(screen.getByText("Product title")).toBeInTheDocument();
	});
});
