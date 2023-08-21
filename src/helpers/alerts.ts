import Swal, { SweetAlertOptions } from "sweetalert2";

interface ConfirmAlert {
	title: string;
	action: () => void;
}

export const confirmAlert = ({ title, action }: ConfirmAlert): void => {
	Swal.fire({
		title,
		icon: "warning",
		confirmButtonText: "Yes",
		showCancelButton: true,
		buttonsStyling: false,
		customClass: {
			popup: "alert__container",
			confirmButton: "alert__aceptButton",
			cancelButton: "alert__cancelButton",
		},
		showClass: {
			popup: "animate__animated animate__fadeInDown",
		},
		hideClass: {
			popup: "animate__animated animate__fadeOutUp",
		},
	}).then((result) => {
		if (result.isConfirmed) action();
	});
};

export const messageAlert = ({ title, text, icon }: SweetAlertOptions): void => {
	Swal.fire({
		title,
		text,
		icon,
		buttonsStyling: false,
		customClass: {
			confirmButton: "alert__aceptButton",
			popup: "alert__container",
		},
		showClass: {
			popup: "animate__animated animate__fadeInDown",
		},
		hideClass: {
			popup: "animate__animated animate__fadeOutUp",
		},
	});
};
