import React from 'react';
import GoToSchedulesImage from './resources/GoToSchedules.png';
import GoToVacationsImage from './resources/GoToVacations.png';
import GoToCreateImage from './resources/GoToCreate.png';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import { useUser } from '../../context/userContext';
import { Utilities } from '../../util/util';
import './HomePage.css';

export default function HomePage() {
	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<div>
			<NavBar />
			<main className="home-page">
				<Link to="/schedule">
					<figure className="home-page-figure">
						<img alt="schedules" src={GoToSchedulesImage} />
						<figcaption>Schedules</figcaption>
					</figure>
				</Link>
				<Link to="/vacations">
					<figure className="home-page-figure">
						<img alt="schedules" src={GoToVacationsImage} />
						<figcaption>Vacations</figcaption>
					</figure>
				</Link>
				{isUserAdmin && (
					<Link to="/create">
						<figure className="home-page-figure">
							<img alt="schedules" src={GoToCreateImage} />
							<figcaption>Create</figcaption>
						</figure>
					</Link>
				)}
			</main>
		</div>
	);
}
