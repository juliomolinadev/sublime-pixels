import { useCheckAuth, useTypedDispatch, useTypedSelector } from "../../hooks";
import { swichRegisterModal } from "../../store/ui";

export const Navbar = () => {
	const status = useCheckAuth();
	const dispatch = useTypedDispatch();
	const { displayName } = useTypedSelector((state) => state.auth);

	const handleOpenLoginModal = (): void => {
		dispatch(swichRegisterModal());
	};

	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<img src="../../../img/sublimePixelsLogo.png" alt="Sublime pixels logo" />
			</div>

			<div className="navbar__controls">
				{status === "authenticated" && <div className="navbar__user">{displayName}</div>}

				<button className="navbar__loginButton" onClick={handleOpenLoginModal}>
					Login
				</button>
			</div>
		</nav>
	);
};
