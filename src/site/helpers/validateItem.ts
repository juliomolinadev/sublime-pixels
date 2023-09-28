export const validateItem = (item = {}): boolean => {
	const entries = Object.entries(item);

	//id validation
	const idEntrie = entries.find(([key]) => key === "id");
	const id = idEntrie ? `${idEntrie[1]}` : "";

	if (id.length === 0) {
		console.log("Item id is required");
		return false;
	}

	//img validation
	const imgEntrie = entries.find(([key]) => key === "img");
	const img = imgEntrie ? `${imgEntrie[1]}` : "";

	if (!img.includes("https://") || (!img.includes(".png") && !img.includes(".jpg"))) {
		console.log("Item image link is required");
		return false;
	}

	//title validation
	const titleEntrie = entries.find(([key]) => key === "title");
	const title = titleEntrie ? `${titleEntrie[1]}` : "";

	if (title.length === 0) {
		console.log("Item title is required");
		return false;
	}

	//buyLink validation
	const buyLinkEntrie = entries.find(([key]) => key === "buyLink");
	const buyLink = buyLinkEntrie ? `${buyLinkEntrie[1]}` : "";

	if (!buyLink.includes("https://")) {
		console.log("Item buy link is required");
		return false;
	}

	//fileLinks validation
	const fileLinksEntrie = entries.find(([key]) => key === "fileLinks");
	const fileLinks =
		fileLinksEntrie && Array.isArray(fileLinksEntrie[1]) ? fileLinksEntrie[1] : [[]];

	if (fileLinks.length === 0) {
		console.log("Item file links are required");
		return false;
	}

	const validLinks = fileLinks.map((fileLink) => {
		const link = `${fileLink}`;
		if (!link.includes("https://")) {
			console.log("Valid item file links are required");
			return false;
		}
	});

	if (validLinks.includes(false)) return false;

	return true;
};
