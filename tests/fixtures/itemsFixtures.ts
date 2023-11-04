import { ItemProps } from "../../src/store";

export const testItemsInitialState = {
	items: [
		{
			id: "1",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 1",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 0,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		{
			id: "2",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 2",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 1,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},
	],
	currentItems: {
		"1": {
			id: "1",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 1",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 0,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		"2": {
			id: "2",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 2",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 1,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},
	},
};

export const newTestItems: ItemProps[] = [
	{
		id: "3",
		batch: "2",
		img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
		title: "Title 3",
		buyLink: "https://www.etsy.com",
		fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
		likes: 0,
		disLikes: 0,
		downloads: 0,
		isDownloading: false,
	},

	{
		id: "4",
		batch: "2",
		img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
		title: "Title 4",
		buyLink: "https://www.etsy.com",
		fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
		likes: 1,
		disLikes: 0,
		downloads: 0,
		isDownloading: false,
	},
];

export const newTestCurrentItems = {
	"3": {
		id: "3",
		batch: "2",
		img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
		title: "Title 3",
		buyLink: "https://www.etsy.com",
		fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
		likes: 0,
		disLikes: 0,
		downloads: 0,
		isDownloading: false,
	},

	"4": {
		id: "4",
		batch: "2",
		img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
		title: "Title 4",
		buyLink: "https://www.etsy.com",
		fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
		likes: 1,
		disLikes: 0,
		downloads: 0,
		isDownloading: false,
	},
};

export const testNewItemsAddedState = {
	items: [
		{
			id: "1",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 1",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 0,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		{
			id: "2",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 2",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 1,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		{
			id: "3",
			batch: "2",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 3",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 0,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		{
			id: "4",
			batch: "2",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 4",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 1,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},
	],
	currentItems: {
		"3": {
			id: "3",
			batch: "2",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 3",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 0,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		"4": {
			id: "4",
			batch: "2",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 4",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 1,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},
	},
};

export const testNewCurrentItemsSettedState = {
	items: [
		{
			id: "1",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 1",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 0,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		{
			id: "2",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 2",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 1,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		{
			id: "3",
			batch: "2",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 3",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 0,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		{
			id: "4",
			batch: "2",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 4",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 1,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},
	],
	currentItems: {
		"1": {
			id: "1",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 1",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 0,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},

		"2": {
			id: "2",
			batch: "1",
			img: "https://i.etsystatic.com/44663047/r/il/e6a1ea/5066928204/il_1140xN.5066928204_6l7x.jpg",
			title: "Title 2",
			buyLink: "https://www.etsy.com",
			fileLinks: ["https://www.firebase.com/bucket", "https://www.firebase.com/bucket"],
			likes: 1,
			disLikes: 0,
			downloads: 0,
			isDownloading: false,
		},
	},
};
