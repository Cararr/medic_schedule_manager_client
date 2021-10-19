import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RiArrowDropDownLine } from 'react-icons/ri';
import './NavBar.css';
import Utilities from '../../util/Utilities';

export const NavBar: React.FunctionComponent = () => {
	const [isNavBarTransparent, setIsNavBarTransparent] = useState(true);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const isMobileDevice = window.screen.width < 500;

	const { user, changeUser } = useUser();
	const isUserBoss = Utilities.checkIfUserIsAdmin(user);
	const logOut = () => {
		changeUser();
		Cookies.remove('user');
	};

	const isThisHomePage = window.location.pathname === '/home';
	const isThisVacations = window.location.pathname === '/vacations';

	useEffect(() => {
		const toggleBackgroundStyles = () => {
			if (window.pageYOffset && isNavBarTransparent)
				setIsNavBarTransparent(false);
			else if (!window.pageYOffset && !isNavBarTransparent) {
				setIsNavBarTransparent(true);
			}
		};

		window.addEventListener('scroll', toggleBackgroundStyles);
		return () => window.removeEventListener('scroll', toggleBackgroundStyles);
	}, [isNavBarTransparent]);

	useEffect(() => {
		const hideDropDown = ({ target }: Event) => {
			const element = target as Element;
			if (element.matches('.dropdown-menu-trigger')) return;
			if (!element.matches('.dropdown-content')) setIsMenuOpen(false);
		};
		document.addEventListener('click', hideDropDown);
		return () => {
			document.removeEventListener('click', hideDropDown);
		};
	}, []);

	return (
		<nav
			style={{
				position: isThisVacations && !isMobileDevice ? 'initial' : 'sticky',
				backgroundColor: isNavBarTransparent
					? 'var(--backgroundBlue)'
					: 'var(--backgroundYellow)',
				boxShadow: isNavBarTransparent
					? 'none'
					: '0 1px 3px 0 rgba(244, 175, 139, 0.9)',
			}}
			className="navbar"
		>
			{!isThisHomePage && (
				<div className="dropdown-menu">
					<button
						onClick={() => {
							setIsMenuOpen(isMenuOpen ? false : true);
						}}
						className="dropdown-menu-trigger"
						style={{ fontWeight: isMenuOpen ? 600 : 200 }}
					>
						Menu
						<RiArrowDropDownLine
							className="dropdown-menu-trigger"
							style={{
								transform: isMenuOpen ? 'rotate(180deg)' : '',
								transition: 'transform .15s ease-in-out',
							}}
						/>
					</button>
					<ul
						style={
							isMenuOpen
								? {
										opacity: 1,
										transform: 'translateY(0)',
										pointerEvents: 'auto',
								  }
								: {}
						}
						className="dropdown-content"
					>
						<li className="dropdown-list-item">
							<NavLink activeClassName="link-active" to="/schedules">
								Schedules
							</NavLink>
						</li>
						<li className="dropdown-list-item">
							<NavLink activeClassName="link-active" to="/vacations">
								Vacations
							</NavLink>
						</li>
						{isUserBoss && !isMobileDevice && (
							<li className="dropdown-list-item">
								<NavLink activeClassName="link-active" to="/create">
									Create
								</NavLink>
							</li>
						)}
					</ul>
				</div>
			)}
			<h3 className="header-navbar">{`${user?.firstName} ${user?.lastName}`}</h3>
			<Link style={{ gridColumnStart: 3, justifySelf: 'end' }} to="/">
				<button
					onClick={logOut}
					className="button-generic button-logout"
					type="button"
				>
					Log out
				</button>
			</Link>
		</nav>
	);
};
