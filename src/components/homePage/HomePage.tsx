import React from 'react';
import SchedulesImage from '../../resources/images/SchedulesImage.png';
import VacationsImage from '../../resources/images/VacationsImage.png';
import CreateImage from '../../resources/images/CreateImage.png';
import { NavBar } from '../navBar/NavBar';
import { CardsContainer } from '../cardsContainer/CardsContainer';
import { useUser } from '../../providers/UserContext';
import Utilities from '../../util/Utilities';
import './HomePage.css';

export const HomePage: React.FunctionComponent = () => {
	const isUserBoss = Utilities.checkIfUserIsAdmin(useUser().user);

	const cards = [
		{
			path: '/schedules',
			name: 'Schedules',
			image: SchedulesImage,
		},
		{
			path: '/vacations',
			name: 'Vacations',
			image: VacationsImage,
		},
		{
			path: '/create',
			name: 'Create',
			image: CreateImage,
			adminOnly: true,
		},
	];

	return (
		<div>
			<NavBar />
			<CardsContainer isUserBoss={isUserBoss} cards={cards} />
		</div>
	);
};
