import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { uiSlice } from "./ui";
import { batchesSlice } from "./batches";
import { itemsSlice } from "./items";
import { userSlice } from "./user";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		ui: uiSlice.reducer,
		batches: batchesSlice.reducer,
		items: itemsSlice.reducer,
		user: userSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
