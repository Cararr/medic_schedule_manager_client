import React from 'react';
import './LandingPage.css';
import scheduleCalendar from './resources/ScheduleEntryLogo.jpg';

export default function LandingPage() {
	return (
		<div className="landing-page">
			<main>
				<header>
					<h1 className="landing-page-header">Medic Schedule Manager</h1>
				</header>

				<img alt="Schedule Calendar" src={scheduleCalendar} />

				<button className="button-generic">Log in</button>
			</main>
		</div>
	);
}
