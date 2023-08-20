import Modal from "react-modal";

import { useTypedDispatch, useTypedSelector } from "../../hooks/storeHooks";
import { useForm } from "../../hooks";
import { setErrorMsg, swichLoginModal } from "../../store/ui";
import { isValidEmail } from "../../helpers";
import { startLoginWithEmailPassword } from "../../store/auth";

Modal.setAppElement("#root");

interface FormData {
	email: string;
	password: string;
}

export const LoginForm = () => {
	const { errorMsg, isOpenLoginModal } = useTypedSelector((state) => state.ui);
	const { status } = useTypedSelector((state) => state.auth);

	const dispatch = useTypedDispatch();

	const { email, password, handleInputChange, resetForm } = useForm<FormData>({
		email: "",
		password: "",
	});

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isFormValid()) {
			// const emailRegisteredMessage = "Firebase: Error (auth/email-already-in-use).";

			const result = await dispatch(startLoginWithEmailPassword({ email, password }));

			if (result.ok) {
				resetForm();
				dispatch(swichLoginModal());
			}
		}
	};

	const isFormValid = () => {
		if (!isValidEmail(email)) {
			dispatch(setErrorMsg("Invalid email"));
			return false;
		}

		dispatch(setErrorMsg(""));
		return true;
	};

	const closeModal = (): void => {
		dispatch(swichLoginModal());
		dispatch(setErrorMsg(null));
	};

	return (
		<Modal
			isOpen={isOpenLoginModal}
			onRequestClose={closeModal}
			contentLabel="Example Modal"
			className="authForm animate__animated animate__fadeIn"
			overlayClassName="authForm__overlay animate__animated animate__fadeIn"
		>
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
						type="password"
						className="form__input"
						placeholder="Set password"
						autoComplete="off"
						name="password"
						value={password}
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
				{/* <Link to="/auth/login" className="authForm__link">
						Iniciar sesión
					</Link> */}
			</p>
		</Modal>
	);
};
