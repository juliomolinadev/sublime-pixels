import Swal from "sweetalert2";
import { useCheckAuth, useTypedDispatch, useTypedSelector } from "../../hooks";
import { startLogout } from "../../store/auth";
import { swichLoginModal } from "../../store/ui";

export const Navbar = () => {
	const status = useCheckAuth();
	const dispatch = useTypedDispatch();
	const { displayName } = useTypedSelector((state) => state.auth);

	const handleOpenLoginModal = (): void => {
		dispatch(swichLoginModal());
	};

	const handleLogout = (): void => {
		Swal.fire({
			title: "Are you sure you want to log out?",
			icon: "warning",
			confirmButtonText: "Yes",
			showCancelButton: true,
			buttonsStyling: false,
			customClass: {
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
			if (result.isConfirmed) dispatch(startLogout());
		});
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
