import React from 'react';
import './HomePage.css';
import GoToSchedules from './resources/GoToSchedules.png';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<main className="home-page">
			<Link to="/schedule">
				<figure className="home-page-figure">
					<img alt="schedules" src={GoToSchedules} />
					<figcaption>Schedules</figcaption>
				</figure>
			</Link>
		</main>
	);
}
