export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar__logo">
				<img src="../../../public/img/sublimePixelsLogo.png" alt="Sublime pixels logo" />
			</div>

			<div className="navbar__controls">
				<div className="navbar__user">Julz</div>

				<button className="navbar__loginButton">Login</button>
			</div>
		</nav>
	);
};
