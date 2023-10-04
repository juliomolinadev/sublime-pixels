export const batchesInitialState = {
	batches: {},
	activeBatch: "",
	batchesArray: [],
};

export const newBatch = {
	id: "2",
	downloadables: 1,
	name: "Batch 2",
};

export const batchesNewBatch = {
	batches: {
		2: {
			id: "2",
			downloadables: 1,
			name: "Batch 2",
		},
	},
	activeBatch: "",
	batchesArray: [],
};

export const batchesNewActiveBatch = {
	batches: {},
	activeBatch: "2",
	batchesArray: [],
};

export const batchesNewBatchesArray = {
	batches: {},
	activeBatch: "",
	batchesArray: ["1", "2"],
};
