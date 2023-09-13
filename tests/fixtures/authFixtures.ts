interface AuthState {
	status: string;
	uid: string | null;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	authErrorMessage: string | null;
	emailVerified: boolean;
}

export const authInitialState: AuthState = {
	status: "checking", //"not-authenticated", "authenticated",
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	authErrorMessage: null,
	emailVerified: false,
};

export const authenticatedState: AuthState = {
	status: "authenticated", //"not-authenticated", "authenticated",
	uid: "12345678",
	email: "demoUser@email.com",
	displayName: "Demo User",
	photoURL: "https://img.jpg",
	authErrorMessage: null,
	emailVerified: true,
};

export const notVerifiedState: AuthState = {
	status: "authenticated", //"not-authenticated", "authenticated",
	uid: "12345678",
	email: "demoUser@email.com",
	displayName: "Demo User",
	photoURL: "https://img.jpg",
	authErrorMessage: null,
	emailVerified: false,
};

export const notAuthenticatedState: AuthState = {
	status: "not-authenticated", //"not-authenticated", "authenticated",
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	authErrorMessage: null,
	emailVerified: false,
};

export const demoUser = {
	uid: "12345678",
	email: "demoUser@email.com",
	displayName: "Demo User",
	photoURL: "https://img.jpg",
	emailVerified: false,
};
