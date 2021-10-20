import React, { useState } from 'react';
import LandingImage from '../../resources/images/LandingImage.png';
import { LoginPanel } from './LoginPanel';
import { warningMessage } from '../../WinBox/winboxMessages';
import { login } from '../../api/login';
import { useEmployees } from '../../providers/employeesContext';
import { Link, RouteComponentProps } from 'react-router-dom';
import { UserCrudentials } from '../../types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useUser } from '../../providers/userContext';
import './LandingPage.css';

export const LandingPage: React.FunctionComponent<RouteComponentProps> = ({
	history,
}) => {
	const { path } = useRouteMatch();
	const [loginInputValue, setLoginInputValue] = useState(
		returnEmptyLoginValues()
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
		setLoginInputValue((prev) => ({ ...prev, [target.name]: target.value }));

	const { changeUser } = useUser();
	const { employees, loadEmployees } = useEmployees();

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
		}
	};

	const handleCloseLoginPanel = () => {
		setLoginInputValue(returnEmptyLoginValues());
		history.push('/');
	};

	const isLoginPanelOn = path === '/login';

	return (
		<main className="landing-page">
			<div>
				<header className="header-landing-page">
					<h1 className="header-landing-page-main">Fizjo Medyk</h1>
					<h3 className="header-landing-page-secoundary">
						Przestrzeń w sieci dla najlepszej grupy fizjoterapeutów w Świdnicy
					</h3>
				</header>
				<img alt="Schedule Calendar" src={LandingImage} />
				<div className="container-button-login">
					<Link to={isLoginPanelOn ? '/' : '/login'}>
						<button className="button-generic button-login">Start</button>
					</Link>
				</div>
				<Switch>
					<Route exact path={'/login'}>
						<LoginPanel
							handleInputChange={handleInputChange}
							loginInputValue={loginInputValue}
							handleLogin={handleLogin}
							handleCloseLoginPanel={handleCloseLoginPanel}
							isLoading={isLoading}
						/>
					</Route>
				</Switch>
			</div>
		</main>
	);
};

const returnEmptyLoginValues = (): UserCrudentials => ({
	lastName: '',
	password: '',
});
