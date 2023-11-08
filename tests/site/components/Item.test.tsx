import React from "react";
import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { Item } from "../../../src/site/components/Item";
import { testItems } from "../../fixtures/componentsFixtures";
import userEvent from "@testing-library/user-event";
import { updateDocInFirestore } from "../../../src/firebase/firestoreCRUD";
import { RegisterForm } from "../../../src/site/components/RegisterForm";

vi.mock("../../../src/firebase/firestoreCRUD/updateDocOnFirestore");

const preloadedState = {
	user: {
		uid: "1",
		likes: [],
		dislikes: [],
		downloads: [],
	},
	items: {
		items: [{ ...testItems[0] }],
		currentItems: {
			1: { ...testItems[0] },
		},
		currentItemIds: ["1"],
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
		expect(screen.getByRole("button", { name: "Download straight" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Download tapered" })).toBeInTheDocument();
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

	it("should dislike item", async () => {
		vi.mocked(updateDocInFirestore).mockResolvedValue(true);

		const props = {
			...testItems[0],
			title: "Test Product Title",
			hasDownloadables: true,
			isDownloaded: false,
		};

		const user = userEvent.setup();

		renderWithProviders(<Item {...props} />, { preloadedState });

		const dislikeButton = screen.getByLabelText("dislikeButton");
		await user.click(dislikeButton);

		await waitFor(() => {
			expect(dislikeButton).toHaveClass("item__dislikeButton--active");
		});
	});

	it("should open register modal", async () => {
		const preloadedState = {
			user: {
				uid: null,
				likes: [],
				dislikes: [],
				downloads: [],
			},
		};

		const props = {
			...testItems[0],
			title: "Test Product Title",
			hasDownloadables: true,
			isDownloaded: false,
		};

		const user = userEvent.setup();

		renderWithProviders(
			<>
				<RegisterForm />
				<Item {...props} />
			</>,

			{ preloadedState },
		);

		const downloadButton = screen.getByRole("button", { name: "Download straight" });
		await user.click(downloadButton);

		await waitFor(() => {
			expect(screen.getByText("Signup")).toBeInTheDocument();
		});
	});

	it("should show confirmation email alert", async () => {
		const preloadedState = {
			auth: {
				status: "authenticated",
				uid: "123",
				email: "julz3@dev.com",
				displayName: "julz",
				photoURL: null,
				authErrorMessage: null,
				emailVerified: false,
			},
		};

		const props = {
			...testItems[0],
			title: "Test Product Title",
			hasDownloadables: true,
			isDownloaded: false,
		};

		const user = userEvent.setup();

		renderWithProviders(<Item {...props} />, { preloadedState });

		const downloadButton = screen.getByRole("button", { name: "Download straight" });
		await user.click(downloadButton);

		await waitFor(() => {
			expect(screen.getByText("Please verify your email first")).toBeInTheDocument();
		});
	});
});
