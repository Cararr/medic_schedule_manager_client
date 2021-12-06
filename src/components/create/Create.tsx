import React from 'react';
import SchedulesImage from 'assets/images/SchedulesImage.png';
import VacationsImage from 'assets/images/VacationsImage.png';
import HomeImage from 'assets/images/HomeImage.png';
import { CardsContainer } from 'components/cardsContainer/CardsContainer';
import { Outlet } from 'react-router-dom';
import styles from './create.module.scss';

export const Create: React.FunctionComponent = () => {
	const cards = [
		{
			path: `schedules`,
			name: 'Schedules',
			image: SchedulesImage,
		},
		{
			path: `vacations`,
			name: 'Vacations',
			image: VacationsImage,
		},
		{
			path: `home-rehabilitations`,
			name: 'Home rehabilitations',
			image: HomeImage,
		},
	];
	return (
		<>
			<h1 className={styles.createHeader}>What would you like to create?</h1>
			<CardsContainer cards={cards} />
			<Outlet />
		</>
	);
};
