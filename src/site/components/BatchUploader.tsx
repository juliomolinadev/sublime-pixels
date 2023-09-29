import { readJSON } from "../../helpers";
import { useForm } from "../../hooks";
import { validateBatchJSON } from "../helpers";
import { saveBatch } from "../helpers/saveBatch";
import { Batch } from "../interfaces/siteInterfaces";

export const BatchUploader = () => {
	const { filesInput, handleInputChange } = useForm({ filesInput: "" });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const batch = await readJSON(filesInput[0] as unknown as Blob);

		const isAValidBatch = validateBatchJSON({ ...(batch as object) });

		if (isAValidBatch) {
			saveBatch(batch as Batch);
		}
	};

	return (
		<form className="batchUploader" onSubmit={handleSubmit}>
			<label htmlFor="filesInput">
				<div className="batchUploader__label">Upload JSON:</div>
			</label>

			<input
				id="filesInput"
				type="file"
				className="batchUploader__fileInput"
				name="filesInput"
				onChange={handleInputChange}
			/>

			<input type="submit" className="batchUploader__button" value="Submit" name="submit" />
		</form>
	);
};
