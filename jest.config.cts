module.exports = {
	testEnvironment: "jest-environment-jsdom",
	// testEnvironment: "node",
	setupFiles: ["./jest.setup.ts"],
	transformIgnorePatterns: [],
	preset: "ts-jest",
};
