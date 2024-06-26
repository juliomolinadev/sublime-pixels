import { ChangeEvent, useState } from "react";

export const useForm = <T>(initState: T) => {
	const [formValues, setFormValues] = useState(initState);

	const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = target;

		if (target.files) {
			setFormValues({
				...formValues,
				[name]: target.files,
			});
		} else {
			setFormValues({
				...formValues,
				[name]: value,
			});
		}
	};

	const resetForm = (): void => {
		setFormValues(initState);
	};

	return {
		formValues,
		resetForm,
		handleInputChange,
		...formValues,
	};
};
