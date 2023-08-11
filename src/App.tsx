import { Batch } from "./site/components/Batch";
import { PaginationControls } from "./site/components/PaginationControls";

export const App = () => {
	return (
		<div className="App">
			<Batch />
			<PaginationControls />
		</div>
	);
};
