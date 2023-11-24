import React from "react";
import { describe, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { DownloadsCounter } from "../../../src/site/components/DownloadsCounter";
import { renderWithProviders } from "../../utils/test-utils";
import { expect } from "vitest";

const preloadedState = {
	user: {
		uid: "1",
		likes: [],
		dislikes: [],
		downloads: ["1"],
		userRole: "user",
		freeDownloads: 5,
	},
};

describe("<DownloadsCounter/>", () => {
	it("should render component with 5 in counter", () => {
		renderWithProviders(<DownloadsCounter />, { preloadedState });

		expect(screen.getByText("5")).toBeInTheDocument();
	});
});
