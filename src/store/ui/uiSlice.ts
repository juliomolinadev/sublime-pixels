import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
		changeLoadingState: (state) => {
			state.isLoading = !state.isLoading;
		},

		setErrorMsg: (state, action: PayloadAction<string | null>) => {
			state.errorMsg = action.payload;
		},

		swichRegisterModal: (state) => {
			state.isOpenRegisterModal = !state.isOpenRegisterModal;
		},

		swichLoginModal: (state) => {
			state.isOpenLoginModal = !state.isOpenLoginModal;
		},

		swichAuthForm: (state) => {
			state.isOpenLoginModal = !state.isOpenLoginModal;
			state.isOpenRegisterModal = !state.isOpenRegisterModal;
		},
	},
});

export const {
	changeLoadingState,
	setErrorMsg,
	swichRegisterModal,
	swichLoginModal,
	swichAuthForm,
} = uiSlice.actions;
export const selectCount = (state: RootState) => state.ui.errorMsg;
export default uiSlice.reducer;
