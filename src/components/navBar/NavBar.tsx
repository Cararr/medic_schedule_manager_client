import React, { useEffect, useState } from 'react';
import { useUser } from 'providers/UserContext';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Utilities from 'util/Utilities';
import styles from './NavBar.module.scss';

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
			if (element.matches(`.${styles.menuTrigger}`)) return;
			if (!element.matches(`.${styles.menuContent}`)) setIsMenuOpen(false);
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
				backgroundColor: isNavBarTransparent ? '' : 'var(--backgroundYellow)',
				boxShadow: isNavBarTransparent
					? 'none'
					: '0 1px 3px 0 rgba(244, 175, 139, 0.9)',
			}}
			className={`not-printable ${styles.nav}`}
		>
			{!isThisHomePage && (
				<div className={styles.menu}>
					<button
						onClick={() => {
							setIsMenuOpen(isMenuOpen ? false : true);
						}}
						className={styles.menuTrigger}
						style={{ fontWeight: isMenuOpen ? 600 : 200 }}
					>
						Menu
						<RiArrowDropDownLine
							className={styles.menuTrigger}
							style={{
								transform: isMenuOpen ? 'rotate(180deg)' : '',
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
					>
						<li>
							<NavLink activeClassName={styles.active} to="/schedules">
								Schedules
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName={styles.active} to="/vacations">
								Vacations
							</NavLink>
						</li>
						{isUserBoss && !isMobileDevice && (
							<li>
								<NavLink activeClassName={styles.active} to="/create">
									Create
								</NavLink>
							</li>
						)}
					</ul>
				</div>
			)}
			<h3
				className={styles.header}
			>{`${user?.firstName} ${user?.lastName}`}</h3>
			<Link style={{ gridColumnStart: 3, justifySelf: 'end' }} to="/">
				<button onClick={logOut} className="button" type="button">
					Log out
				</button>
			</Link>
		</nav>
	);
};
