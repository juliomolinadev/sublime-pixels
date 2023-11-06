import { uiErrorMessages } from "../../src/assets/errorMessages";

interface UiState {
	uiErrorMessage: string | null;
	isLoading: boolean;
	isOpenRegisterModal: boolean;
	isOpenLoginModal: boolean;
	batches: string[];
}

export const uiInitialState: UiState = {
	uiErrorMessage: null,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: false,
	batches: [],
};

export const uiLoadingState: UiState = {
	uiErrorMessage: null,
	isLoading: true,
	isOpenRegisterModal: false,
	isOpenLoginModal: false,
	batches: [],
};

export const openRegisterModalState: UiState = {
	uiErrorMessage: null,
	isLoading: false,
	isOpenRegisterModal: true,
	isOpenLoginModal: false,
	batches: [],
};

export const openLoginModalState: UiState = {
	uiErrorMessage: null,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: true,
	batches: [],
};

export const credentialsErrorLoginModalState: UiState = {
	uiErrorMessage: uiErrorMessages.credentialsError,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: true,
	batches: [],
};

export const networkErrorLoginModalState: UiState = {
	uiErrorMessage: uiErrorMessages.networkError,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: true,
	batches: [],
};

export const networkErrorRegisterModalState: UiState = {
	uiErrorMessage: uiErrorMessages.networkError,
	isLoading: false,
	isOpenRegisterModal: true,
	isOpenLoginModal: false,
	batches: [],
};
