import { useCheckAuth, useTypedSelector } from "./hooks";
import { Batch } from "./site/components/Batch";
import { Header } from "./site/components/Header";
import { BatchUploader } from "./site/components/BatchUploader";
import { LoginForm } from "./site/components/LoginForm";
import { Navbar } from "./site/components/Navbar";
import { RegisterForm } from "./site/components/RegisterForm";
import { useSetItems } from "./hooks/useSetItems";

export const App = () => {
	const { userRole } = useTypedSelector((state) => state.user);

	const status = useCheckAuth();

	useSetItems();

	return (
		<div className="App">
			{status !== "checking" && <Navbar />}
			<Header />
			<Batch />

			{userRole === "admin" && <BatchUploader />}

			<RegisterForm />
			<LoginForm />
		</div>
	);
};
