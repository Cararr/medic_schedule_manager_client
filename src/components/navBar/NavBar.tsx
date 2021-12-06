import React, { useEffect, useState } from 'react';
import { useUser } from 'providers/UserContext';
import { NavLink, useMatch } from 'react-router-dom';
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

	const homePage = useMatch('/home');
	const vacationsPage = useMatch('/vacations');
	const notFoundPage = useMatch('/404');

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

	return notFoundPage ? null : (
		<nav
			style={{
				position: vacationsPage && !isMobileDevice ? 'initial' : 'sticky',
				backgroundColor: isNavBarTransparent ? '' : 'var(--backgroundYellow)',
				boxShadow: isNavBarTransparent
					? 'none'
					: '0 1px 3px 0 rgba(244, 175, 139, 0.9)',
			}}
			className={`not-printable ${styles.nav}`}
		>
			{!homePage && (
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
							<NavLink
								className={({ isActive }) => (isActive ? styles.active : '')}
								to="/schedules"
							>
								Schedules
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) => (isActive ? styles.active : '')}
								to="/vacations"
							>
								Vacations
							</NavLink>
						</li>
						{isUserBoss && !isMobileDevice && (
							<li>
								<NavLink
									className={({ isActive }) => (isActive ? styles.active : '')}
									to="/create"
								>
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
			<button
				onClick={logOut}
				className="button"
				style={{ gridColumnStart: 3, justifySelf: 'end' }}
				type="button"
			>
				Log out
			</button>
		</nav>
	);
};
