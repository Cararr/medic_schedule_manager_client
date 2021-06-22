import React, { useState } from 'react';
import LandingImage from '../../resources/images/LandingImage.jpg';
import LoginPanel from '../landingPage/LoginPanel.jsx';
import { loginWarning } from '../../WinBox/winboxMessages';
import { login } from '../../util/postToDB';
import { useChangeUser } from '../../context/userContext';
import { useEmployees, useLoadEmployees } from '../../context/employeesContext';
import './LandingPage.css';

export default function LandingPage({ history }) {
	const [isLoginOn, setIsLoginOn] = useState(false);
	const [loginInputValue, setLoginInputValue] = useState(
		returnEmptyLoginValues()
	);
	const handleInputChange = ({ target }) =>
		setLoginInputValue((prev) => ({ ...prev, [target.name]: target.value }));

	const changeUser = useChangeUser();
	const employees = useEmployees();
	const loadEmployees = useLoadEmployees();

	const handleLogin = async (e) => {
		e.preventDefault();
		const loginReponse = await login(loginInputValue);
		if (loginReponse?.passed) {
			if (!employees.length) loadEmployees();
			changeUser(loginReponse.user);
			history.push('/home');
		} else {
			setLoginInputValue(returnEmptyLoginValues());
			loginWarning(loginReponse?.message);
			setIsLoginOn(false);
		}
	};

	const openLoginPanel = () => setIsLoginOn(true);

	const closeLoginPanel = () => {
		setIsLoginOn(false);
		setLoginInputValue(returnEmptyLoginValues());
	};

	return (
		<div className="landing-page">
			<main>
				<header>
					<h1 className="landing-page-header">Medic Schedule Manager</h1>
				</header>
				<img alt="Schedule Calendar" src={LandingImage} />
				<button
					onClick={isLoginOn ? closeLoginPanel : openLoginPanel}
					className="button-generic landing-page-button"
				>
					Log in
				</button>
				{isLoginOn && (
					<LoginPanel
						handleInputChange={handleInputChange}
						loginInputValue={loginInputValue}
						handleLogin={handleLogin}
						closeLoginPanel={closeLoginPanel}
					/>
				)}
			</main>
		</div>
	);
}

const returnEmptyLoginValues = () => ({
	lastName: '',
	password: '',
});
