import { it, describe } from "vitest";
import { shuffle } from "../../src/helpers/shuffle";
import { expect } from "vitest";

describe("shuffle helper tests", () => {
	it("should return a shuffled array", () => {
		const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const shuffledArray = shuffle(array);
		const counters: number[] = [];

		array.forEach((item) => {
			const matches = shuffledArray.filter((newItem) => newItem === item);
			counters.push(matches.length);
		});

		let hasDiferences = false;
		counters.forEach((counter) => {
			if (counter !== 1) {
				hasDiferences = true;
			}
		});

		expect(shuffledArray).not.toEqual(array);
		expect(shuffledArray.length).toBe(array.length);
		expect(hasDiferences).toBeFalsy();
	});
});
