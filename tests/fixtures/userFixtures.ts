export const userInitialState = {
	uid: null,
	downloads: [],
	likes: [],
	dislikes: [],
	userRole: null,
	freeDownloads: 0,
};

export const setUserState = {
	uid: "1234567890",
	downloads: [],
	likes: [],
	dislikes: [],
	userRole: "user",
	freeDownloads: 5,
};

export const newDownloadUserState = {
	uid: "1234567890",
	downloads: ["1234567890"],
	likes: [],
	dislikes: [],
	userRole: "user",
	freeDownloads: 5,
};

export const newLikeUserState = {
	uid: "1234567890",
	downloads: [],
	likes: ["1234567890"],
	dislikes: [],
	userRole: "user",
	freeDownloads: 5,
};

export const newDislikeUserState = {
	uid: "1234567890",
	downloads: [],
	likes: [],
	dislikes: ["1234567890"],
	userRole: "user",
	freeDownloads: 5,
};
