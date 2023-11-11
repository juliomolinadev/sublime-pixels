import React, { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { useOutsideAlerter } from "../../src/hooks";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const Component = () => {
	const downloaderMenuRef = useRef<HTMLDivElement>(null);
	useOutsideAlerter({ ref: downloaderMenuRef, action: () => console.log("Outside click") });

	return (
		<>
			<div ref={downloaderMenuRef}>Component</div>
			<div>Outside</div>
		</>
	);
};

const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

describe("useOutsideAlert tests", () => {
	it("hould show an alert when user click outside the component", async () => {
		const user = userEvent.setup();

		render(<Component />);

		const outside = screen.getByText("Outside");
		await user.click(outside);

		await waitFor(() => {
			expect(consoleMock).toHaveBeenLastCalledWith("Outside click");
		});
	});
});
