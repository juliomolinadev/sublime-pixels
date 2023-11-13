import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { startLogout, startResendEmailVerification } from "../../store/auth";
import { switchLoginModal } from "../../store/ui";
import { confirmAlert } from "../../helpers";

export const Navbar = () => {
	const dispatch = useTypedDispatch();
	const { displayName, emailVerified, status } = useTypedSelector((state) => state.auth);
	const { isLoading } = useTypedSelector((state) => state.ui);

	const handleOpenLoginModal = (): void => {
		dispatch(switchLoginModal());
	};

	const handleLogout = (): void => {
		const alert = {
			title: "Are you sure you want to log out?",
			action: () => dispatch(startLogout()),
		};

		confirmAlert(alert);
	};

	const handleResendEmailVerification = (): void => {
		dispatch(startResendEmailVerification());
	};

	return (
		<nav className="navbar">
			<div className="navbar__main">
				<div className="navbar__logo">
					<img
						src="../../../img/sp-icon.png"
						alt="Sublime pixels logo"
						className="navbar__logoIcon"
					/>
					<span className="navbar__logoLabel">Sublime Pixels</span>
				</div>

				<div className="navbar__controls">
					{status === "authenticated" ? (
						<div className="navbar__user">
							<div className="navbar__userName">{displayName}</div>
							<button className="navbar__loginButton" onClick={handleLogout}>
								Logout
							</button>
						</div>
					) : (
						<button className="navbar__loginButton" onClick={handleOpenLoginModal}>
							Login
						</button>
					)}
				</div>
			</div>

			{!emailVerified && status === "authenticated" && (
				<div className="navbar__alert">
					<div className="navbar__alertMessage">
						Please confirm your email account. Haven't received the confirmation email yet?
					</div>
					<div className="navbar__alertAction" onClick={handleResendEmailVerification}>
						Resend confirmation email
						{isLoading && <div className="navbar__alertSpinner"></div>}
					</div>
				</div>
			)}
		</nav>
	);
};
