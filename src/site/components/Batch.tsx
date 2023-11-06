import { Item } from "./Item";
import { useTypedSelector } from "../../hooks";

const downloads = ["1"];

export const Batch = () => {
	const { currentItems, currentItemIds } = useTypedSelector((state) => state.items);
	const { batches, activeBatch } = useTypedSelector((state) => state.batches);

	const downloadables = batches[activeBatch] && batches[activeBatch].downloadables;
	const batchDownloads = currentItemIds.filter((itemId) => downloads.includes(itemId));
	const hasDownloadables = batchDownloads.length < downloadables;

	return (
		<div className="batch">
			{currentItemIds.map((itemId) => (
				<Item key={itemId} hasDownloadables={hasDownloadables} {...currentItems[itemId]} />
			))}
		</div>
	);
};
