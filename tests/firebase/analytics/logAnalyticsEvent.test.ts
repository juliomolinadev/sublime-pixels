import { vi } from "vitest";
import { it } from "vitest";
import { describe } from "vitest";
import { logEvent } from "firebase/analytics";
import { logAnalyticsEvent } from "../../../src/firebase/analytics/logAnalyticsEvent";
import { expect } from "vitest";

vi.mock("firebase/analytics", async () => {
	const actual = await vi.importActual("firebase/analytics");
	return {
		...(actual as object),
		logEvent: vi.fn(),
	};
});

describe("logAnalyticsEvent.ts tests", () => {
	it("should return without log analytics event", () => {
		const event = {
			eventName: "test",
			eventParams: {
				test: "test",
			},
		};

		logAnalyticsEvent(event);

		expect(logEvent).toHaveBeenCalledTimes(0);
	});
});
