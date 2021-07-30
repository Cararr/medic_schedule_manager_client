import React, { useState } from 'react';
import { NavBar } from '../navBar/NavBar';
import './Vacations.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export const Vacations: React.FunctionComponent = () => {
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const events = [
		{ title: 'event 1', date: '2021-06-01', color: 'red' },
		{
			title: 'event 2',
			start: '2021-07-01',
			end: '2021-07-06',
			color: 'green',
		},
		{ title: 'event 2', date: '2021-07-01' },
	];

	return (
		<div>
			<NavBar />
			<main className="main-calendar">
				<FullCalendar
					// weekends={false}
					firstDay={1}
					datesSet={(date) => {
						const displayedYear = new Date(
							date.start.setMonth(date.start.getMonth() + 1)
						).getFullYear();
						if (displayedYear !== selectedYear) setSelectedYear(displayedYear);
					}}
					headerToolbar={{ left: 'prevYear nextYear', center: 'title' }}
					events={events}
					height="auto"
					plugins={[dayGridPlugin]}
					locale={'pl'}
					buttonText={{
						today: 'dziś',
						prevYear: `${selectedYear - 1}`,
						nextYear: `${selectedYear + 1}`,
						prev: '◀',
						next: '▶',
					}}
				/>
			</main>
		</div>
	);
};
