import React, { useState } from 'react';
import { NavBar } from '../navBar/NavBar';
import './Vacations.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
export const Vacations: React.FunctionComponent = () => {
	return (
		<div>
			<NavBar />
			<main className="main-calendar">
				<FullCalendar
					weekends={false}
					events={[
						{ title: 'event 1', date: '2021-07-01', color: 'red' },
						{ title: 'event 2', date: '2021-07-01' },
					]}
					plugins={[dayGridPlugin]}
					locale={'pl'}
					buttonText={{
						today: 'dziś',
						month: 'month',
						week: 'week',
						day: 'day',
						list: 'list',
					}}
					initialView="dayGridMonth"
				/>
			</main>
		</div>
	);
};
