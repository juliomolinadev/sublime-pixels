import Modal from "react-modal";
import { SweetAlertOptions } from "sweetalert2";

import { useTypedDispatch, useTypedSelector } from "../../hooks/storeHooks";
import { useForm } from "../../hooks";
import { setErrorMsg, swichAuthForm, swichRegisterModal } from "../../store/ui";
import { isValidEmail, messageAlert } from "../../helpers";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

Modal.setAppElement("#root");

interface FormData {
	name: string;
	email: string;
	password: string;
	password2: string;
}

export const RegisterForm = () => {
	const { errorMsg, isOpenRegisterModal } = useTypedSelector((state) => state.ui);
	const { status } = useTypedSelector((state) => state.auth);

	const dispatch = useTypedDispatch();

	const { name, email, password, password2, handleInputChange, resetForm } = useForm<FormData>({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isFormValid()) {
			const result = await dispatch(
				startCreatingUserWithEmailPassword({ email, password, displayName: name }),
			);

			const emailRegisteredMessage = "Firebase: Error (auth/email-already-in-use).";
			const networkErrorMessage = "Firebase: Error (auth/network-request-failed).";

			const isNetworkError = result.errorMessage === networkErrorMessage;

			if (!result.ok && isNetworkError) {
				dispatch(
					setErrorMsg("There is a network error, please check your connection or try again later."),
				);
			}

			if (!result.ok && result.errorMessage === emailRegisteredMessage) {
				dispatch(swichRegisterModal());

				const alert: SweetAlertOptions = {
					title: "The email is already registered",
					icon: "error",
				};

				messageAlert(alert);
			}

			if (result.ok) {
				resetForm();
				dispatch(swichRegisterModal());

				const alert: SweetAlertOptions = {
					title: "Please verify your email address",
					text: "Check your inbox and follow the link.",
					icon: "warning",
				};

				messageAlert(alert);
			}
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setErrorMsg("Enter username"));
			return false;
		} else if (!isValidEmail(email)) {
			dispatch(setErrorMsg("Invalid email"));
			return false;
		} else if (password.length < 8) {
			dispatch(setErrorMsg("The password must contain at least 8 characters"));
			return false;
		} else if (password !== password2) {
			dispatch(setErrorMsg("Both passwords must be the same"));
			return false;
		}

		dispatch(setErrorMsg(""));
		return true;
	};

	const closeModal = (): void => {
		dispatch(swichRegisterModal());
		dispatch(setErrorMsg(null));
	};

	const handleSwichAuthForm = (): void => {
		dispatch(swichAuthForm());
		dispatch(setErrorMsg(null));
	};

	return (
		<Modal
			isOpen={isOpenRegisterModal}
			onRequestClose={closeModal}
			contentLabel="Example Modal"
			className="authForm animate__animated animate__fadeIn"
			overlayClassName="authForm__overlay animate__animated animate__fadeIn"
		>
			<h2 className="authForm__heading text-center">Signup</h2>

			<form className="form" onSubmit={handleRegister}>
				<div className="form__inputGroup">
					<label htmlFor="name" className="form__label">
						Name:
					</label>
					<input
						id="name"
						type="text"
						className="form__input"
						placeholder="Your name"
						autoComplete="off"
						name="name"
						value={name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form__inputGroup">
					<label htmlFor="email" className="form__label">
						Email:
					</label>
					<input
						id="email"
						type="email"
						className="form__input"
						placeholder="Your email"
						autoComplete="off"
						name="email"
						value={email}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form__inputGroup">
					<label htmlFor="password" className="form__label">
						Password:
					</label>
					<input
						id="password"
						type="password"
						className="form__input"
						placeholder="Set password"
						autoComplete="off"
						name="password"
						value={password}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form__inputGroup">
					<label htmlFor="password2" className="form__label">
						Confirm password:
					</label>
					<input
						id="password2"
						type="password"
						className="form__input"
						placeholder="Confirm password"
						autoComplete="off"
						name="password2"
						value={password2}
						onChange={handleInputChange}
					/>
				</div>

				{errorMsg && (
					<div className="form__error animate__animated animate__fadeInDown">{errorMsg}</div>
				)}

				{status === "checking" && <div className="form__spinner"></div>}

				<input type="submit" className="form__button" value="Submit" />
			</form>

			<p className="authForm__footer text-center">
				Already have an account?{" "}
				<span className="authForm__link" onClick={handleSwichAuthForm}>
					Login here
				</span>
			</p>
		</Modal>
	);
};
