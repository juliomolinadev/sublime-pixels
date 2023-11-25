import { Item } from "./Item";
import { useTypedSelector } from "../../hooks";

export const Batch = () => {
	const { currentItems, currentItemIds } = useTypedSelector((state) => state.items);

	return (
		<div className="batch">
			{currentItemIds.map((itemId) => (
				<Item
					key={itemId}
					// hasDownloadables={hasDownloadables}
					{...currentItems[itemId]}
				/>
			))}
		</div>
	);
};
