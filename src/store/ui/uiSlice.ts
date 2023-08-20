import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UiSliceState {
	errorMsg: string | null;
	isLoading: boolean;
	isOpenRegisterModal: boolean;
}

const initialState: UiSliceState = {
	errorMsg: null,
	isLoading: false,
	isOpenRegisterModal: false,
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
	},
});

export const { changeLoadingState, setErrorMsg, swichRegisterModal } = uiSlice.actions;
export const selectCount = (state: RootState) => state.ui.errorMsg;
export default uiSlice.reducer;
