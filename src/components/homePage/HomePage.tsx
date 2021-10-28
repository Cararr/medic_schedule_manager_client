import React from 'react';
import SchedulesImage from 'assets/images/SchedulesImage.png';
import VacationsImage from 'assets/images/VacationsImage.png';
import CreateImage from 'assets/images/CreateImage.png';
import { NavBar } from 'components/navBar/NavBar';
import { CardsContainer } from 'components/cardsContainer/CardsContainer';
import { useUser } from 'providers/UserContext';
import Utilities from 'util/Utilities';

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
		<>
			<NavBar />
			<CardsContainer isUserBoss={isUserBoss} cards={cards} />
		</>
	);
};
