import React from 'react';
import { useUser, useChangeUser } from '../../context/userContext';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './NavBar.css';

export default function NavBar() {
	const user = useUser();
	const changeUser = useChangeUser();
	const logOut = () => {
		changeUser();
		Cookies.remove('user');
	};
	return (
		<nav className="navbar">
			<h3 className="header-navbar">{`${user.firstName} ${user.lastName}`}</h3>
			<Link to="/">
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
}
