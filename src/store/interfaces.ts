export interface BatchesProps {
	id: string;
	downloadables: number;
	name: string;
}

export interface ItemProps {
	id: string;
	batch: string;
	img: string;
	title: string;
	buyLink: string;
	fileNames: string[];
	likes: number;
	disLikes: number;
	downloads: number;
	isOpenDownloadMenu: boolean;
	isDownloadingStraight: boolean;
	isDownloadingTapered: boolean;
}
