import React, { useState } from 'react';
import LandingImage from '../../resources/images/LandingImage.png';
import { LoginPanel } from './LoginPanel';
import { warningMessage } from '../../WinBox/winboxMessages';
import { login } from '../../api/login';
import { useChangeUser } from '../../context/userContext';
import { useEmployees, useLoadEmployees } from '../../context/employeesContext';
import { RouteComponentProps } from 'react-router-dom';
import { UserCrudentials } from '../../types';
import './LandingPage.css';

export const LandingPage: React.FunctionComponent<RouteComponentProps> = ({
	history,
}) => {
	const [isLoginOn, setIsLoginOn] = useState(false);
	const [loginInputValue, setLoginInputValue] = useState(
		returnEmptyLoginValues()
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
		setLoginInputValue((prev) => ({ ...prev, [target.name]: target.value }));

	const changeUser = useChangeUser();
	const employees = useEmployees();
	const loadEmployees = useLoadEmployees();

	const handleLogin = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setIsLoading(true);
		const loginReponse = await login(loginInputValue);
		setIsLoading(false);
		if (loginReponse?.passed) {
			if (!employees.length) loadEmployees();
			changeUser(loginReponse.user);
			history.push('/home');
		} else {
			setLoginInputValue(returnEmptyLoginValues());
			warningMessage(
				'Login failed',
				loginReponse?.message || 'Something went wrong, please try again later!'
			);
			setIsLoginOn(false);
		}
	};

	const openLoginPanel = () => setIsLoginOn(true);

	const closeLoginPanel = () => {
		setIsLoginOn(false);
		setLoginInputValue(returnEmptyLoginValues());
	};

	return (
		<main className="landing-page">
			<header className="header-landing-page">
				<h1 className="header-landing-page-main">Fizjo Medyk</h1>
				<h3 className="header-landing-page-secoundary">
					Przestrzeń w sieci dla najlepszej grupy fizjoterapeutów w Świdnicy
				</h3>
				<button
					onClick={isLoginOn ? closeLoginPanel : openLoginPanel}
					className="button-generic button-start"
				>
					Zaloguj się
				</button>
			</header>
			<img alt="Schedule Calendar" src={LandingImage} />
			{isLoginOn && (
				<LoginPanel
					handleInputChange={handleInputChange}
					loginInputValue={loginInputValue}
					handleLogin={handleLogin}
					closeLoginPanel={closeLoginPanel}
					isLoading={isLoading}
				/>
			)}
		</main>
	);
};

const returnEmptyLoginValues = (): UserCrudentials => ({
	lastName: '',
	password: '',
});
