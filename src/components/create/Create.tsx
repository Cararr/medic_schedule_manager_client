import React from 'react';
import SchedulesImage from 'assets/images/SchedulesImage.png';
import VacationsImage from 'assets/images/VacationsImage.png';
import HomeImage from 'assets/images/HomeImage.png';
import { NavBar } from 'components/navBar/NavBar';
import { CardsContainer } from 'components/cardsContainer/CardsContainer';
import { CreateSchedules } from './CreateSchedules';
import { CreateVacation } from './CreateVacation';
import { CreateHomeRehabilitation } from './CreateHomeRehabilitation';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styles from './create.module.scss';

export const Create: React.FunctionComponent = () => {
	const { path } = useRouteMatch();

	const cards = [
		{
			path: `${path}/schedules`,
			name: 'Schedules',
			image: SchedulesImage,
		},
		{
			path: `${path}/vacations`,
			name: 'Vacations',
			image: VacationsImage,
		},
		{
			path: `${path}/home-rehabilitaitons`,
			name: 'Home rehabilitaitons',
			image: HomeImage,
		},
	];

	return (
		<>
			<NavBar />
			<h1 className={styles.createHeader}>What would you like to create?</h1>
			<CardsContainer cards={cards} />
			<Switch>
				<Route exact path={`${path}/schedules`}>
					<CreateSchedules />
				</Route>
				<Route exact path={`${path}/vacations`}>
					<CreateVacation />
				</Route>
				<Route exact path={`${path}/home-rehabilitaitons`}>
					<CreateHomeRehabilitation />
				</Route>
			</Switch>
		</>
	);
};
