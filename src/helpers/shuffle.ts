export const shuffle = <T>(array: Array<T>) => {
	let currentIndex = array.length;
	let randomIndex;

	const shuffledArray = [...array];

	while (currentIndex > 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
			shuffledArray[randomIndex],
			shuffledArray[currentIndex],
		];
	}

	return shuffledArray;
};
