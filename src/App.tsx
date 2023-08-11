import { Batch } from "./site/components/Batch";
import { Navbar } from "./site/components/Navbar";
import { PaginationControls } from "./site/components/PaginationControls";

export const App = () => {
	return (
		<div className="App">
			<Navbar />
			<Batch />
			<PaginationControls />
		</div>
	);
};
