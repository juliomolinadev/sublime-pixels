export const readJSON = async (file: Blob) => {
	if (file.type !== "application/json") throw new Error("File is not a JSON file");

	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsArrayBuffer(file);

		fileReader.onload = async (event) => {
			if (event.target) {
				const bufferArray = event.target.result;
				try {
					const parsedJson = JSON.parse(new TextDecoder().decode(bufferArray as ArrayBuffer));
					resolve(parsedJson);
				} catch (e) {
					reject(e);
				}
			}
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};
