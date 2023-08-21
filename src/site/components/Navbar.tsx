import { useCheckAuth, useTypedDispatch, useTypedSelector } from "../../hooks";
import { startLogout } from "../../store/auth";
import { swichLoginModal } from "../../store/ui";
import { confirmAlert } from "../../helpers";

export const Navbar = () => {
	const status = useCheckAuth();
	const dispatch = useTypedDispatch();
	const { displayName } = useTypedSelector((state) => state.auth);

	const handleOpenLoginModal = (): void => {
		dispatch(swichLoginModal());
	};

	const handleLogout = (): void => {
		const alert = {
			title: "Are you sure you want to log out?",
			action: () => dispatch(startLogout()),
		};

		confirmAlert(alert);
	};

	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<img src="../../../img/sublimePixelsLogo.png" alt="Sublime pixels logo" />
			</div>

			<div className="navbar__controls">
				{status === "authenticated" ? (
					<>
						<div className="navbar__user">{displayName}</div>

						<button className="navbar__loginButton" onClick={handleLogout}>
							Logout
						</button>
					</>
				) : (
					<button className="navbar__loginButton" onClick={handleOpenLoginModal}>
						Login
					</button>
				)}
			</div>
		</nav>
	);
};
