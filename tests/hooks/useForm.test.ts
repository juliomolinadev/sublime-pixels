import { act, renderHook } from "@testing-library/react";
import { useForm } from "../../src/hooks/useForm";
import { describe, expect, it } from "vitest";
import { ChangeEvent } from "react";

describe("useForm tests", () => {
	const initialForm = {
		name: "julz",
		email: "julz@dev.com",
		files: [],
	};

	it("should return default values", () => {
		const { result } = renderHook(() => useForm(initialForm));

		expect(result.current).toEqual({
			name: initialForm.name,
			email: initialForm.email,
			files: [],
			formValues: initialForm,
			resetForm: expect.any(Function),
			handleInputChange: expect.any(Function),
		});
	});

	it("should change name", () => {
		const newName = "x_x";
		const { result } = renderHook(() => useForm(initialForm));
		const { handleInputChange } = result.current;

		const event = { target: { name: "name", value: newName } };

		act(() => {
			handleInputChange(event as ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.formValues.name).toBe(newName);
		expect(result.current.name).toBe(newName);
	});

	it("should handle file input change", () => {
		const { result } = renderHook(() => useForm(initialForm));
		const { handleInputChange } = result.current;

		const file = new File(["avatar.jpg"], "avatar.jpg", { type: "image/jpeg" });
		const event = { target: { name: "files", files: [file] } };

		act(() => {
			handleInputChange(event as unknown as ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.files[0]).toEqual(file);
	});

	it("should reset form", () => {
		const newName = "x_x";
		const { result } = renderHook(() => useForm(initialForm));
		const { handleInputChange, resetForm } = result.current;

		const event = { target: { name: "name", value: newName } };

		act(() => {
			handleInputChange(event as ChangeEvent<HTMLInputElement>);
			resetForm();
		});

		expect(result.current.formValues.name).toBe(initialForm.name);
		expect(result.current.name).toBe(initialForm.name);
	});
});
