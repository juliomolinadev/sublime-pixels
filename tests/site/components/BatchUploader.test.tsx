import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BatchUploader } from "../../../src/site/components/BatchUploader";

describe("<BatchUploader /> tests", () => {
	it("should render component", () => {
		render(<BatchUploader />);

		expect(screen.getByLabelText("Upload JSON:")).toBeInTheDocument();
	});
});
