import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { uiSlice } from "./ui";
import { batchesSlice } from "./batches";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		ui: uiSlice.reducer,
		batches: batchesSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
