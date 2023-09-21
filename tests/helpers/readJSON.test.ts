import { describe, expect, it } from "vitest";
import { readJSON } from "../../src/helpers";

describe("readJSON.ts tests", () => {
	it("should resolve with the parsed JSON data", async () => {
		const jsonData = { name: "John", age: 30 };
		const blob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });

		const parsedData = await readJSON(blob);

		expect(parsedData).toEqual(jsonData);
	});

	it("should reject with an error if the file is not a JSON file", async () => {
		const blob = new Blob(["This is not a JSON file"], { type: "text/plain" });
		const error = new Error("File is not a JSON file");

		await expect(readJSON(blob)).rejects.toEqual(error);
	});

	it("should reject with an error when JSON parsing fails", async () => {
		const invalidJson = '{name: "John", age: 30'; // Missing closing brace
		const blob = new Blob([invalidJson], { type: "application/json" });

		try {
			await readJSON(blob);
		} catch (error) {
			expect(error).toBeInstanceOf(SyntaxError);
		}
	});
});
