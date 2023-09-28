import { validateItem } from "./validateItem";

export const validateBatchJSON = (batch = {}): boolean => {
	const entries = Object.entries(batch);

	const infoEntrie = entries.find(([key]) => key === "info");
	const info = infoEntrie ? Object(infoEntrie[1]) : {};

	const id = info && Object.prototype.hasOwnProperty.call(info, "id") ? info.id : "";
	const downloadables =
		info && Object.prototype.hasOwnProperty.call(info, "downloadables") ? info.downloadables : 0;
	const name = info && Object.prototype.hasOwnProperty.call(info, "name") ? info.name : "";

	const itemsEntrie = entries.find(([key]) => key === "items");
	const items =
		itemsEntrie && itemsEntrie[1] && Array.isArray(itemsEntrie[1]) ? itemsEntrie[1] : [];

	if (!infoEntrie) {
		console.log("Batch info is required");
		return false;
	}

	if (id.length === 0) {
		console.log("Batch id is required");
		return false;
	}

	if (downloadables <= 0) {
		console.log("Number of downloadable items is required");
		return false;
	}

	if (name.length === 0) {
		console.log("Batch name is required");
		return false;
	}

	if (items.length === 0) {
		console.log("Items are required");
		return false;
	}

	items?.forEach((item) => {
		if (validateItem(item) === false) return false;
	});

	return true;
};
