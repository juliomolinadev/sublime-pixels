import Modal from "react-modal";

import { useTypedDispatch, useTypedSelector } from "../../hooks/storeHooks";
import { useForm } from "../../hooks";
import { setUiErrorMessage, switchAuthForm, switchLoginModal } from "../../store/ui";
import { isValidEmail } from "../../helpers";
import { startLoginWithEmailPassword } from "../../store/auth";
import { formErrorMessages } from "../../assets/errorMessages";

// Modal.setAppElement("#root");
if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

interface FormData {
	email: string;
	password: string;
}

export const LoginForm = () => {
	const { uiErrorMessage, isOpenLoginModal } = useTypedSelector((state) => state.ui);
	const { status } = useTypedSelector((state) => state.auth);

	const dispatch = useTypedDispatch();

	const { email, password, handleInputChange, resetForm } = useForm<FormData>({
		email: "",
		password: "",
	});

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isFormValid()) {
			await dispatch(startLoginWithEmailPassword({ email, password }));

			resetForm();
		}
	};

	const isFormValid = () => {
		if (!isValidEmail(email)) {
			dispatch(setUiErrorMessage(formErrorMessages.emailError));
			return false;
		}

		if (password.length === 0) {
			dispatch(setUiErrorMessage(formErrorMessages.passwordError));
			return false;
		}

		dispatch(setUiErrorMessage(null));
		return true;
	};

	const closeModal = (): void => {
		dispatch(switchLoginModal());
		dispatch(setUiErrorMessage(null));
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

			<form className="form" onSubmit={handleRegister}>
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

				{uiErrorMessage && (
					<div className="form__error animate__animated animate__fadeInDown">{uiErrorMessage}</div>
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
