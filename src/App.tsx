import { Batch } from "./site/components/Batch";
import { Navbar } from "./site/components/Navbar";
import { PaginationControls } from "./site/components/PaginationControls";
import { RegisterForm } from "./site/components/RegisterForm";

export const App = () => {
	return (
		<div className="App">
			<Navbar />
			<Batch />
			<PaginationControls />
			<RegisterForm />
		</div>
	);
};
