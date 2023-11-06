import { getBlobFromStorage } from "../../firebase/storage";

interface Props {
	batch: string;
	file: string;
}

export const downloadImage = async ({ batch, file }: Props) => {
	const blob = await getBlobFromStorage(`gs://sublime-pixels-dev.appspot.com/${batch}/${file}`);

	if (!blob) return;

	const fileUrl = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = fileUrl;
	a.download = file;
	a.click();
};
