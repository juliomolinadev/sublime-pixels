import Modal from "react-modal";

import { useTypedDispatch, useTypedSelector } from "../../hooks/storeHooks";
import { useForm } from "../../hooks";
import { setUiErrorMessage, switchAuthForm, switchLoginModal } from "../../store/ui";
import { isValidEmail } from "../../helpers";
import { startLoginWithEmailPassword } from "../../store/auth";
import { formErrorMessages } from "../../assets/errorMessages";
import { useState } from "react";

// Modal.setAppElement("#root");
if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

interface FormData {
	email: string;
	password: string;
}

export const LoginForm = () => {
	const { isOpenLoginModal } = useTypedSelector((state) => state.ui);
	const { status } = useTypedSelector((state) => state.auth);

	const dispatch = useTypedDispatch();

	const { email, password, handleInputChange, resetForm } = useForm<FormData>({
		email: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState<null | string>(null);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isFormValid()) {
			await dispatch(startLoginWithEmailPassword({ email, password }));

			resetForm();
		}
	};

	const isFormValid = () => {
		if (!isValidEmail(email)) {
			setErrorMessage(formErrorMessages.emailError);
			return false;
		}

		if (password.length === 0) {
			setErrorMessage(formErrorMessages.passwordError);
			return false;
		}

		setErrorMessage(null);
		return true;
	};

	const closeModal = (): void => {
		dispatch(switchLoginModal());
		setErrorMessage(null);
	};

	const handleSwitchAuthForm = (): void => {
		dispatch(switchAuthForm());
		dispatch(setUiErrorMessage(null));
	};

	return (
		<Modal
			isOpen={isOpenLoginModal}
			onRequestClose={closeModal}
			contentLabel="Example Modal"
			className="authForm animate__animated animate__fadeIn"
			overlayClassName="authForm__overlay animate__animated animate__fadeIn"
			ariaHideApp={process.env.NODE_ENV !== "test"}
		>
			<button className="authForm__closeButton" aria-label="closeButton" onClick={closeModal}>
				x
			</button>

			<h2 className="authForm__heading text-center">Login</h2>

			<form className="form" onSubmit={handleLogin}>
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
						aria-label="passwordInput"
						type="password"
						className="form__input"
						placeholder="Your password"
						autoComplete="off"
						name="password"
						value={password}
						onChange={handleInputChange}
					/>
				</div>

				{errorMessage && (
					<div className="form__error animate__animated animate__fadeInDown">{errorMessage}</div>
				)}

				{status === "checking" && <div className="form__spinner"></div>}

				<input type="submit" className="form__button" value="Submit" aria-label="loginButton" />
			</form>

			<p className="authForm__footer text-center">
				You have not yet registered?
				<span className="authForm__link" onClick={handleSwitchAuthForm} aria-label="signUpLink">
					Sign up here
				</span>
			</p>
		</Modal>
	);
};
