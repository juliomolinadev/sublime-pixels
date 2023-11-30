import { useEffect, useState } from "react";

export const usePagination = (batches: string[]) => {
	const [centralBatch, setCentralBatch] = useState<string | null>(
		batches.length >= 5 ? batches[2] : null,
	);
	const [visibleBatches, setVisibleBatches] = useState<string[]>(
		batches.length >= 6 ? batches.slice(0, 5) : batches,
	);

	useEffect(() => {
		setCentralBatch(batches.length >= 5 ? batches[2] : null);
		setVisibleBatches(batches.length >= 6 ? batches.slice(0, 5) : batches);
	}, [batches]);

	useEffect(() => {
		if (!centralBatch) return;

		const indexOfCentralBatch = batches.indexOf(centralBatch);
		const batchesShown = batches.slice(indexOfCentralBatch - 2, indexOfCentralBatch + 3);

		setVisibleBatches(batchesShown);
	}, [centralBatch, batches]);

	const onMoveOne = (positions: number): void => {
		if (!centralBatch) return;

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
