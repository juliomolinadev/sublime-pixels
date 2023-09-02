import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

// import userReducer from '../features/users/userSlice'
import { authSlice } from "../../src/store/auth";
import { uiSlice } from "../../src/store/ui";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
	// user: userReducer,
	auth: authSlice.reducer,
	ui: uiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
