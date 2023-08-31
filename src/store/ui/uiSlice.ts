import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

interface UiSliceState {
	errorMsg: string | null;
	isLoading: boolean;
	isOpenRegisterModal: boolean;
	isOpenLoginModal: boolean;
}

const initialState: UiSliceState = {
	errorMsg: null,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: false,
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		switchLoadingState: (state) => {
			state.isLoading = !state.isLoading;
		},

		switchRegisterModal: (state) => {
			state.isOpenRegisterModal = !state.isOpenRegisterModal;
		},

		switchLoginModal: (state) => {
			state.isOpenLoginModal = !state.isOpenLoginModal;
		},

		switchAuthForm: (state) => {
			state.isOpenLoginModal = !state.isOpenLoginModal;
			state.isOpenRegisterModal = !state.isOpenRegisterModal;
		},

		setErrorMsg: (state, action: PayloadAction<string | null>) => {
			state.errorMsg = action.payload;
		},
	},
});

export const {
	switchLoadingState,
	switchRegisterModal,
	switchLoginModal,
	switchAuthForm,
	setErrorMsg,
} = uiSlice.actions;
// export const selectCount = (state: RootState) => state.ui.errorMsg;
// export default uiSlice.reducer;
