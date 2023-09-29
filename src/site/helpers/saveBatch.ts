import {
	createBatchOnFirestore,
	createDocOnFirestore,
	updateDocInFirestore,
} from "../../firebase/firestoreCRUD";
import { Batch, BatchInfo } from "../interfaces/siteInterfaces";

export const saveBatch = async (batch: Batch) => {
	saveItems(batch);
	saveBatchInfo(batch.info);
	updateBatchesArray(batch.info.id);
};

const saveItems = async (batch: Batch) => {
	const data = batch.items.map((item) => {
		return {
			...item,
			batch: batch.info.id,
			likes: 0,
			disLikes: 0,
			downloads: 0,
		};
	});

	const itemsQuery = {
		collectionPath: "items",
		data,
	};

	const areItemsCreated = await createBatchOnFirestore(itemsQuery);

	if (areItemsCreated) console.log("Items created successfully");
};

const saveBatchInfo = async (info: BatchInfo) => {
	const batchInfoQuery = {
		collectionPath: "batches",
		docId: info.id,
		document: info,
	};

	const isBatchInfoCreated = await createDocOnFirestore(batchInfoQuery);

	if (isBatchInfoCreated) console.log("Batch info created successfully");
};

const updateBatchesArray = async (batchId: string) => {
	const updateBatchesArrayQuery = {
		collectionPath: "app",
		docId: "batches",
		updates: {},
		arrayUnionUpdate: {
			fieldName: "batches",
			value: batchId,
		},
	};

	const isBatchArrayUpdated = await updateDocInFirestore(updateBatchesArrayQuery);

	if (isBatchArrayUpdated) console.log("Batch array updated successfully");
};
