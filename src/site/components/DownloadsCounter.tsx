import { useTypedSelector } from "../../hooks";
import { FiGift } from "react-icons/fi";

export const DownloadsCounter = () => {
	const { batches, activeBatch } = useTypedSelector((state) => state.batches);
	const { currentItemIds } = useTypedSelector((state) => state.items);
	const { downloads } = useTypedSelector((state) => state.user);

	const downloadedItems = downloads.map((id) => {
		return currentItemIds.find((itemId) => itemId === id);
	});

	return (
		<div
			className={`downloadsCounter ${
				batches[activeBatch] &&
				batches[activeBatch].downloadables - downloadedItems.length > 0 &&
				"downloadsCounter--available"
			}`}
		>
			<FiGift className="downloadsCounter__icon" />

			<div className="downloadsCounter__label">Free downloads:</div>

			<div className="downloadsCounter__counter">
				{batches[activeBatch] && batches[activeBatch].downloadables - downloadedItems.length}
			</div>
		</div>
	);
};
