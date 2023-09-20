export const userInitialState = {
	uid: null,
	downloads: [],
	likes: [],
	dislikes: [],
};

export const setUserState = {
	uid: "1234567890",
	downloads: [],
	likes: [],
	dislikes: [],
};

export const newDownloadUserState = {
	uid: "1234567890",
	downloads: ["1234567890"],
	likes: [],
	dislikes: [],
};

export const newLikeUserState = {
	uid: "1234567890",
	downloads: [],
	likes: ["1234567890"],
	dislikes: [],
};

export const newDislikeUserState = {
	uid: "1234567890",
	downloads: [],
	likes: [],
	dislikes: ["1234567890"],
};
