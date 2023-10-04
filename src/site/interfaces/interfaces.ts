export interface BatchInfo {
	id: string;
	downloadables: number;
	name: string;
}

export interface BatchItems {
	id: string;
	img: string;
	title: string;
	buyLink: string;
	fileLinks: string[];
}

export interface Batch {
	info: BatchInfo;
	items: BatchItems[];
}
