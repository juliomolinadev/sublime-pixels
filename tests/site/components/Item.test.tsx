import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { Item } from "../../../src/site/components/Item";
import { testItems } from "../../fixtures/componentsFixtures";

describe("<Item /> tests", () => {
	it("should render component", () => {
		const title = "Test Product Title";
		const props = { ...testItems[0], title, hasDownloadables: true };

		const { container } = renderWithProviders(<Item {...props} />);

		expect(screen.getByText(props.title)).toBeInTheDocument();
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it("should render component with download button", () => {
		const props = {
			...testItems[0],
			title: "Test Product Title",
			hasDownloadables: true,
			isDownloaded: false,
		};

		const { container } = renderWithProviders(<Item {...props} />);

		expect(screen.getByText(props.title)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
