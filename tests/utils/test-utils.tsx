import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// import { setupStore } from '../app/store'
import { setupStore } from "./setupStore";
import type { AppStore, RootState } from "./setupStore";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {},
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function getStoreWrapper(preloadedState = {}) {
	const store = setupStore(preloadedState);
	const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

	return { wrapper, store };
}
