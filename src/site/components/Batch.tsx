import { Item } from "./Item";
import { useTypedSelector } from "../../hooks";
import { shuffle } from "../../helpers/shuffle";

const downloads = ["1"];

export const Batch = () => {
	const { currentItems } = useTypedSelector((state) => state.items);
	const { batches, activeBatch } = useTypedSelector((state) => state.batches);

	const itemIds = Object.keys(currentItems);

	shuffle(itemIds);

	const downloadables = batches[activeBatch] && batches[activeBatch].downloadables;
	const batchDownloads = itemIds.filter((itemId) => downloads.includes(itemId));
	const hasDownloadables = batchDownloads.length < downloadables;

	return (
		<div className="batch">
			{itemIds.map((itemId) => (
				<Item key={itemId} hasDownloadables={hasDownloadables} {...currentItems[itemId]} />
			))}
		</div>
	);
};
