import { useTypedSelector } from "../../hooks";
import { DownloadsCounter } from "./DownloadsCounter";
import { Invitation } from "./Invitation";
import { PaginationControls } from "./PaginationControls";

export const Header = () => {
	const { uid } = useTypedSelector((state) => state.auth);

	return (
		<div className="header">
			<PaginationControls />

			{uid ? <DownloadsCounter /> : <Invitation />}
		</div>
	);
};
