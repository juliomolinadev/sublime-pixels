import React from "react";
import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { Item } from "../../../src/site/components/Item";
import { testItems } from "../../fixtures/componentsFixtures";
import userEvent from "@testing-library/user-event";
import { updateDocInFirestore } from "../../../src/firebase/firestoreCRUD";

vi.mock("../../../src/firebase/firestoreCRUD/updateDocOnFirestore");

const preloadedState = {
	user: {
		uid: "1",
		likes: [],
		dislikes: [],
		downloads: [],
	},
};

describe("<Item /> tests", () => {
	it("should render component", () => {
		const title = "Test Product Title";
		const props = { ...testItems[0], title, hasDownloadables: true };

		const { container } = renderWithProviders(<Item {...props} />, { preloadedState });

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

		const { container } = renderWithProviders(<Item {...props} />, { preloadedState });

		expect(screen.getByText(props.title)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it("should like item", async () => {
		vi.mocked(updateDocInFirestore).mockResolvedValue(true);

		const props = {
			...testItems[0],
			title: "Test Product Title",
			hasDownloadables: true,
			isDownloaded: false,
		};

		const user = userEvent.setup();

		renderWithProviders(<Item {...props} />, { preloadedState });

		const likeButton = screen.getByLabelText("likeButton");
		await user.click(likeButton);

		await waitFor(() => {
			expect(likeButton).toHaveClass("item__likeButton--active");
		});
	});
});
