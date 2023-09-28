export interface BatchesProps {
	id: string;
	downloadables: number;
	name: string;
	items: { [key: string]: ItemProps };
}

export interface ItemProps {
	id: string;
	batch: string;
	img: string;
	title: string;
	buyLink: string;
	downloadFiles: string[];
	likes: number;
	disLikes: number;
	downloads: number;
}