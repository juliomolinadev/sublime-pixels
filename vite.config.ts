/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		open: true,
	},
	preview: {
		open: true,
	},
	test: {
		globals: true,
		environment: "jsdom",
		// environment: "happy-dom",
		css: true,
		setupFiles: "./tests/setup.ts",
		testTimeout: 10000,
		coverage: {
			all: true,
			exclude: [
				"coverage/**",
				"dist/**",
				"packages/*/test?(s)/**",
				"**/*.d.ts",
				"**/virtual:*",
				"**/__x00__*",
				"**/\x00*",
				"cypress/**",
				"test?(s)/**",
				"test?(-*).?(c|m)[jt]s?(x)",
				"**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)",
				"**/__tests__/**",
				"**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
				"**/vitest.{workspace,projects}.[jt]s?(on)",
				"**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}",
				"**/commitlint.config.cts",
				"**/index.ts",
				"**/validateEmail.ts",
				"**/getBlobFromStorage.ts",
				"**/firebaseProviders.ts",
				"**/downloadImage.ts",
				"**/store.ts",
				"**/App.tsx",
				"**/main.tsx",
				"**/useCheckAuth.ts",
				"**/interfaces.ts",
			],
		},
	},
});
