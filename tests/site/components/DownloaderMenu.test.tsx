import React from "react";
import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test-utils";
import { testItems } from "../../fixtures/componentsFixtures";
import { DownloaderMenu } from "../../../src/site/components/DownloaderMenu";

vi.mock("../../../src/firebase/firestoreCRUD/updateDocOnFirestore");

const preloadedState = {
	user: {
		uid: "1",
		likes: [],
		dislikes: [],
		downloads: [],
	},
	items: {
		items: [{ ...testItems[0], isOpenDownloadMenu: true }],
		currentItems: {
			1: { ...testItems[0], isOpenDownloadMenu: true },
		},
		currentItemIds: ["1"],
	},
};

describe("<DownloaderMenu /> tests", () => {
	it("should render component", () => {
		const props = {
			id: "1",
			batch: "1",
			isDownloadingStraight: false,
			isDownloadingTapered: false,
			fileNames: ["file1", "file2"],
		};

		const { container } = renderWithProviders(<DownloaderMenu {...props} />, { preloadedState });

		expect(screen.getByText("Straight image")).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
