import { useCheckAuth } from "./hooks";
import { Batch } from "./site/components/Batch";
import { BatchUploader } from "./site/components/BatchUploader";
import { LoginForm } from "./site/components/LoginForm";
import { Navbar } from "./site/components/Navbar";
import { PaginationControls } from "./site/components/PaginationControls";
import { RegisterForm } from "./site/components/RegisterForm";

export const App = () => {
	const status = useCheckAuth();

	return (
		<div className="App">
			{status !== "checking" && <Navbar />}
			<BatchUploader />
			<Batch />
			<PaginationControls />
			<RegisterForm />
			<LoginForm />
		</div>
	);
};
