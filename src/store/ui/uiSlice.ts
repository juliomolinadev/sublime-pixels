import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

interface UiSliceState {
	uiErrorMessage: string | null;
	isLoading: boolean;
	isOpenRegisterModal: boolean;
	isOpenLoginModal: boolean;
}

const initialState: UiSliceState = {
	uiErrorMessage: null,
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

		setUiErrorMessage: (state, action: PayloadAction<string | null>) => {
			state.uiErrorMessage = action.payload;
		},
	},
});

export const {
	switchLoadingState,
	switchRegisterModal,
	switchLoginModal,
	switchAuthForm,
	setUiErrorMessage,
} = uiSlice.actions;
// export const selectCount = (state: RootState) => state.ui.errorMsg;
// export default uiSlice.reducer;
