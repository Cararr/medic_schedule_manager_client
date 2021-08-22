import React, { useEffect, useState } from 'react';
import { useUser, useChangeUser } from '../../context/userContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './NavBar.css';

export const NavBar: React.FunctionComponent = () => {
	const [backgroundStyles, setBackgroundStyles] = useState({
		backgroundColor: 'var(--backgroundBlue)',
		borderBottom: 'none',
	});

	const user = useUser();
	const changeUser = useChangeUser();
	const logOut = () => {
		changeUser();
		Cookies.remove('user');
	};

	const isThisHomePage = window.location.pathname === '/home';
	const isThisVacations = window.location.pathname === '/vacations';

	useEffect(() => {
		const toggleBackgroundStyles = () => {
			console.log(backgroundStyles.backgroundColor);

			if (
				window.pageYOffset &&
				backgroundStyles.backgroundColor === 'var(--backgroundBlue)'
			)
				setBackgroundStyles({
					backgroundColor: 'var(--backgroundYellow)',
					borderBottom: '1px solid black',
				});
			else if (
				window.pageYOffset === 0 &&
				backgroundStyles.backgroundColor === 'var(--backgroundYellow)'
			) {
				setBackgroundStyles({
					backgroundColor: 'var(--backgroundBlue)',
					borderBottom: 'none',
				});
			}
		};
		window.addEventListener('scroll', toggleBackgroundStyles);
		return () => window.removeEventListener('scroll', toggleBackgroundStyles);
	}, [backgroundStyles.backgroundColor]);

	return (
		<nav
			style={{
				position: isThisVacations ? 'initial' : 'sticky',
				...backgroundStyles,
			}}
			className="navbar"
		>
			{!isThisHomePage && (
				<Link style={{ gridColumnStart: 1, justifySelf: 'start' }} to="/home">
					<button className="button-generic" type="button">
						Home
					</button>
				</Link>
			)}
			<h3 className="header-navbar">{`${user?.firstName} ${user?.lastName}`}</h3>
			<Link style={{ gridColumnStart: 3, justifySelf: 'end' }} to="/">
				<button onClick={logOut} className="button-generic" type="button">
					Log out
				</button>
			</Link>
		</nav>
	);
};
