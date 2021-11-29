import React from 'react';
import LandingImage from 'assets/images/LandingImage.png';
import { LoginPanel } from './LoginPanel';
import { Link } from 'react-router-dom';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styles from './landingPage.module.scss';

export const LandingPage: React.FunctionComponent = () => {
	const { path } = useRouteMatch();

	const isLoginPanelOn = path === '/login';

	return (
		<main className={styles.landingPage}>
			<header>
				<h1>Fizjo Medyk</h1>
				<h3>
					Przestrzeń w sieci dla najlepszej grupy fizjoterapeutów w Świdnicy
				</h3>
				<div className={styles.buttonContainer}>
					<Link to={isLoginPanelOn ? '/' : '/login'}>
						<button className="button">Start</button>
					</Link>
				</div>
			</header>
			<figure>
				<img alt="Schedule Calendar" src={LandingImage} />
			</figure>
			<Switch>
				<Route exact path={'/login'}>
					<LoginPanel />
				</Route>
			</Switch>
		</main>
	);
};
