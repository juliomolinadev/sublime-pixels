import { it, describe } from "vitest";
import { shuffle } from "../../src/helpers/shuffle";
import { expect } from "vitest";

describe("shuffle helper tests", () => {
	it("should return a shuffled array", () => {
		const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const arrayCopy = array.map((item) => item);

		shuffle(arrayCopy);

		expect(arrayCopy).not.toEqual(array);
	});
});
