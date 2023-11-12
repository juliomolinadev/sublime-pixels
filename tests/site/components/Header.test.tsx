import React from "react";
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { Header } from "../../../src/site/components/Header";
import { batchesNewBatchesArray } from "../../fixtures";

describe("<Batch /> tests", () => {
	it("should render component with invitation", () => {
		const preloadedState = {
			batches: batchesNewBatchesArray,
		};
		renderWithProviders(<Header />, { preloadedState });

		expect(screen.getByText("No credit card needed!")).toBeInTheDocument();
	});

	it("should render component with downloads counter", () => {
		const preloadedState = {
			batches: batchesNewBatchesArray,
			auth: {
				uid: "123",
				status: "not-authenticated",
				email: null,
				displayName: null,
				photoURL: null,
				authErrorMessage: "",
				emailVerified: false,
			},
		};
		renderWithProviders(<Header />, { preloadedState });

		expect(screen.getByText("Free downloads:")).toBeInTheDocument();
	});
});
