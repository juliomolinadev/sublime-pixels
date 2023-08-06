import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
	status: string;
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
	errorMessage: string;
}

const initialState: AuthState = {
	status: "checking", //"not-autenticated", "autenticated"
	uid: "",
	email: "",
	displayName: "",
	photoURL: "",
	errorMessage: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: () => {},
		logout: () => {},
		checkingCredentials: () => {},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.status += action.payload;
		},
	},
});

export const { login, logout, checkingCredentials } = authSlice.actions;

export const selectCount = (state: RootState) => state.auth.status;
export default authSlice.reducer;
