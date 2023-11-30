import { useTypedSelector } from "../../hooks";
import { DownloadsCounter } from "./DownloadsCounter";
import { Invitation } from "./Invitation";
import { PaginationControls } from "./PaginationControls";

export const Header = () => {
	const { uid } = useTypedSelector((state) => state.auth);
	const { batchesArray } = useTypedSelector((state) => state.batches);

	return (
		<div className="header">
			{batchesArray.length > 0 && <PaginationControls />}

			{uid ? <DownloadsCounter /> : <Invitation />}
		</div>
	);
};
