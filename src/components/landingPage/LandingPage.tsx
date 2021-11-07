import React, { useState } from 'react';
import LandingImage from 'assets/images/LandingImage.png';
import { LoginPanel } from './LoginPanel';
import { errorMessage } from 'WinBox/winboxMessages';
import { login } from 'api/login';
import { useEmployees } from 'providers/EmployeesContext';
import { Link, RouteComponentProps } from 'react-router-dom';
import { UserCrudentials } from 'types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useUser } from 'providers/UserContext';
import styles from './landingPage.module.scss';
import globalStyles from 'globalStyles.module.scss';

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

		const response = await login(loginInputValue);

		setIsLoading(false);

		if (response?.status === 201) {
			if (!employees.length) loadEmployees();
			changeUser(response.data.user);
			history.push('/home');
		} else {
			setLoginInputValue(returnEmptyLoginValues());
			if (!response || ![400, 401].includes(response.status))
				return errorMessage(
					'Login failed',
					'Something went wrong, please try again later!'
				);
			errorMessage('Login failed', response.data.message);
		}
	};

	const handleCloseLoginPanel = () => {
		setLoginInputValue(returnEmptyLoginValues());
		history.push('/');
	};

	const isLoginPanelOn = path === '/login';

	return (
		<main className={styles.landingPage}>
			<header className={styles.headerContainer}>
				<h1 className={styles.mainHeader}>Fizjo Medyk</h1>
				<h3 className={styles.secoundaryHeader}>
					Przestrzeń w sieci dla najlepszej grupy fizjoterapeutów w Świdnicy
				</h3>
			</header>
			<img alt="Schedule Calendar" src={LandingImage} />
			<div className={styles.loginButtonContainer}>
				<Link to={isLoginPanelOn ? '/' : '/login'}>
					<button className={`${globalStyles.button} ${styles.loginButton}`}>
						Start
					</button>
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
		</main>
	);
};

const returnEmptyLoginValues = (): UserCrudentials => ({
	lastName: '',
	password: '',
});
