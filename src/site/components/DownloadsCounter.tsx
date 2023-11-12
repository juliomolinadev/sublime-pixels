import { useTypedSelector } from "../../hooks";
import { FiGift } from "react-icons/fi";

export const DownloadsCounter = () => {
	const { batches, activeBatch } = useTypedSelector((state) => state.batches);
	const { currentItemIds } = useTypedSelector((state) => state.items);
	const { downloads } = useTypedSelector((state) => state.user);

	const downloadedItems: string[] = [];

	currentItemIds.forEach((id) => {
		if (downloads.includes(id)) downloadedItems.push(id);
	});

	return (
		<div className="downloadsCounter">
			<div className="downloadsCounter__icon">
				<FiGift />
			</div>

			<div className="downloadsCounter__label">Free downloads:</div>

			<div
				className={`downloadsCounter__counter ${
					batches[activeBatch] &&
					batches[activeBatch].downloadables - downloadedItems.length > 0 &&
					"downloadsCounter__counter--available downloadsCounter__counter--flashes"
				}`}
			>
				{batches[activeBatch] && batches[activeBatch].downloadables - downloadedItems.length}
			</div>
		</div>
	);
};
