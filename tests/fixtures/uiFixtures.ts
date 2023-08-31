interface UiState {
	errorMsg: string | null;
	isLoading: boolean;
	isOpenRegisterModal: boolean;
	isOpenLoginModal: boolean;
}

export const uiInitialState: UiState = {
	errorMsg: null,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: false,
};

export const uiLoadingState: UiState = {
	errorMsg: null,
	isLoading: true,
	isOpenRegisterModal: false,
	isOpenLoginModal: false,
};

export const openRegisterModalState: UiState = {
	errorMsg: null,
	isLoading: false,
	isOpenRegisterModal: true,
	isOpenLoginModal: false,
};

export const openLoginModalState: UiState = {
	errorMsg: null,
	isLoading: false,
	isOpenRegisterModal: false,
	isOpenLoginModal: true,
};
