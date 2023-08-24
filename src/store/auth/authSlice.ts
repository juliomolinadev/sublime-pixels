import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

const initialState: AuthState = {
	status: "checking", //"not-authenticated", "authenticated",
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
	emailVerified: false,
};

interface AuthState {
	status: string;
	uid: string | null;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	errorMessage: string | null;
	emailVerified: boolean;
}

interface AuthUser {
	uid: string | null;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	emailVerified: boolean;
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<AuthUser>) => {
			state.status = "authenticated";
			state.uid = action.payload.uid;
			state.email = action.payload.email;
			state.displayName = action.payload.displayName;
			state.photoURL = action.payload.photoURL;
			state.emailVerified = action.payload.emailVerified;
			state.errorMessage = null;
		},

		logout: (state, action: PayloadAction<string | null>) => {
			state.status = "not-authenticated";
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoURL = null;
			state.emailVerified = false;
			state.errorMessage = action.payload;
		},

		checkingCredentials: (state) => {
			state.status = "checking";
		},
	},
});

export const { login, logout, checkingCredentials } = authSlice.actions;

// export const selectCount = (state: RootState) => state.auth.status;
// export default authSlice.reducer;
