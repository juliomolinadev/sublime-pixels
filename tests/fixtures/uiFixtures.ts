import { uiErrorMessages } from "../../src/assets/errorMessages";
interface UiState {
	uiErrorMessage: string | null;
	isLoading: boolean;
	isOpenRegisterModal: boolean;
	isOpenLoginModal: boolean;
}

export const uiInitialState: UiState = {
	uiErrorMessage: null,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: false,
};

export const uiLoadingState: UiState = {
	uiErrorMessage: null,
	isLoading: true,
	isOpenRegisterModal: false,
	isOpenLoginModal: false,
};

export const openRegisterModalState: UiState = {
	uiErrorMessage: null,
	isLoading: false,
	isOpenRegisterModal: true,
	isOpenLoginModal: false,
};

export const openLoginModalState: UiState = {
	uiErrorMessage: null,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: true,
};

export const credentialsErrorLoginModalState: UiState = {
	uiErrorMessage: uiErrorMessages.credentialsError,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: true,
};

export const networkErrorLoginModalState: UiState = {
	uiErrorMessage: uiErrorMessages.networkError,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: true,
};

export const networkErrorRegisterModalState: UiState = {
	uiErrorMessage: uiErrorMessages.networkError,
	isLoading: false,
	isOpenRegisterModal: true,
	isOpenLoginModal: false,
};
