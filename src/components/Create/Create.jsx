import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import SchedulesImage from '../../resources/images/SchedulesImage.png';
import VacationsImage from '../../resources/images/VacationsImage.png';
import HomeImage from '../../resources/images/HomeImage.png';
import CardsContainer from '../CardsContainer/CardsContainer.jsx';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import './Create.css';

export default function Create() {
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
	// ZACZNIJ OD DODANIA PANELU DO TWORZENIA HRÓW
	return (
		<div>
			<NavBar />
			<h1 className="title-create">Select topic to create:</h1>
			<CardsContainer cards={cards} />

			<Switch>
				<Route exact path={`${path}/schedules`}>
					<h3>schedules</h3>
				</Route>
				<Route exact path={`${path}/vacations`}>
					<h3>vacations</h3>
				</Route>
				<Route exact path={`${path}/home-rehabilitaitons`}>
					<h3>home-rehabilitaitons</h3>
				</Route>
			</Switch>
		</div>
	);
}
