import { useEffect, useState } from "react";

export const usePagination = (batches: string[]) => {
	const [centralBatch, setCentralBatch] = useState(batches[2]);
	const [visibleBatches, setVisibleBatches] = useState<string[]>(batches);

	useEffect(() => {
		const indexOfCentralBatch = batches.indexOf(centralBatch);
		const batchesShown = batches.slice(indexOfCentralBatch - 2, indexOfCentralBatch + 3);

		if (batches.length < 5) setVisibleBatches(batches);
		else setVisibleBatches(batchesShown);
	}, [centralBatch, batches]);

	const onMoveOne = (positions: number): void => {
		const index = batches.indexOf(centralBatch);
		const newPosition = index + positions;

		if (newPosition < 2 || newPosition > batches.length - 3) return;
		setCentralBatch(batches[index + positions]);
	};

	const onMoveStart = (): void => {
		setCentralBatch(batches[2]);
	};

	const onMoveEnd = (): void => {
		setCentralBatch(batches[batches.length - 3]);
	};

	return { visibleBatches, onMoveOne, onMoveStart, onMoveEnd };
};
