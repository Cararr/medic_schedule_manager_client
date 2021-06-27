import React from 'react';
import { useUser, useChangeUser } from '../../context/userContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './NavBar.css';

export const NavBar: React.FunctionComponent = () => {
	const user = useUser();
	const changeUser = useChangeUser();
	const logOut = () => {
		changeUser();
		Cookies.remove('user');
	};

	const isThisHomePage = window.location.pathname === '/home';

	return (
		<nav className="navbar">
			{!isThisHomePage && (
				<Link to="/home">
					<button className="button-generic" type="button">
						Home
					</button>
				</Link>
			)}
			<h3 className="header-navbar">{`${user?.firstName} ${user?.lastName}`}</h3>
			<Link to="/">
				<button onClick={logOut} className="button-generic" type="button">
					Log out
				</button>
			</Link>
		</nav>
	);
};
