// Batch gifts counter
// Navigation

import { DownloadsCounter } from "./DownloadsCounter";
import { PaginationControls } from "./PaginationControls";

export const Header = () => {
	return (
		<div className="header">
			<PaginationControls />
			<DownloadsCounter />
		</div>
	);
};
