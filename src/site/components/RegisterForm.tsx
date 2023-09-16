import Modal from "react-modal";

import { useTypedDispatch, useTypedSelector } from "../../hooks/storeHooks";
import { useForm } from "../../hooks";
import { setUiErrorMessage, switchAuthForm, switchRegisterModal } from "../../store/ui";
import { isValidEmail } from "../../helpers";
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { uiErrorMessages } from "../../assets/errorMessages";
import { useEffect } from "react";

// Modal.setAppElement("#root");
if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

interface FormData {
	name: string;
	email: string;
	password: string;
	password2: string;
}

export const RegisterForm = () => {
	const { uiErrorMessage, isOpenRegisterModal } = useTypedSelector((state) => state.ui);
	const { status } = useTypedSelector((state) => state.auth);

	const dispatch = useTypedDispatch();

	const { name, email, password, password2, handleInputChange, resetForm } = useForm<FormData>({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	useEffect(() => {
		if (status === "authenticated" && email.length > 0) resetForm();
	}, [status, resetForm, email]);

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isFormValid()) {
			await dispatch(startCreatingUserWithEmailPassword({ email, password, displayName: name }));
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setUiErrorMessage(uiErrorMessages.userNameError));
			return false;
		}

		if (!isValidEmail(email)) {
			dispatch(setUiErrorMessage(uiErrorMessages.emailError));
			return false;
		}

		if (password.length < 8) {
			dispatch(setUiErrorMessage(uiErrorMessages.shortPasswordError));
			return false;
		}

		if (password !== password2) {
			dispatch(setUiErrorMessage(uiErrorMessages.confirmPasswordError));
			return false;
		}

		dispatch(setUiErrorMessage(""));
		return true;
	};

	const closeModal = (): void => {
		dispatch(switchRegisterModal());
		dispatch(setUiErrorMessage(null));
	};

	const handleSwitchAuthForm = (): void => {
		dispatch(switchAuthForm());
		dispatch(setUiErrorMessage(null));
	};

	return (
		<Modal
			isOpen={isOpenRegisterModal}
			onRequestClose={closeModal}
			contentLabel="Example Modal"
			className="authForm animate__animated animate__fadeIn"
			overlayClassName="authForm__overlay animate__animated animate__fadeIn"
			ariaHideApp={process.env.NODE_ENV !== "test"}
		>
			<button className="authForm__closeButton" onClick={closeModal}>
				x
			</button>

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

				{uiErrorMessage && (
					<div className="form__error animate__animated animate__fadeInDown">{uiErrorMessage}</div>
				)}

				{status === "checking" && <div className="form__spinner"></div>}

				<input type="submit" className="form__button" value="Submit" name="submit" />
			</form>

			<p className="authForm__footer text-center">
				Already have an account?{" "}
				<span className="authForm__link" onClick={handleSwitchAuthForm}>
					Login here
				</span>
			</p>
		</Modal>
	);
};
