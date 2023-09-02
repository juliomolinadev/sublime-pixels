// TODO: Search a library to validate emails

export const isValidEmail = (email: string): boolean => {
	const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return emailPattern.test(email);
};
