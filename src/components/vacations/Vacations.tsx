import React, { useState, useEffect } from 'react';
import { NavBar } from '../navBar/NavBar';
import './Vacations.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Get from '../../util/api/Get';
import Utilities from '../../util/Utilities';
import { Vacation } from '../../types';

export const Vacations: React.FunctionComponent = () => {
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [vacations, setVacations] = useState([]);

	useEffect(() => {
		setVacations([]);
		(async function () {
			const annualVacations = await Get.vacationsByYear(selectedYear);
			if (annualVacations)
				setVacations(
					annualVacations.map((vacation: Vacation) => ({
						title: `${vacation.employee.firstName} ${vacation.employee.lastName}`,
						color: Utilities.returnColorPerEmployee(vacation.employee.lastName),
						start: vacation.from,
						end: Utilities.formatDateString(
							Utilities.incrementDateByDay(new Date(vacation.to))
						),
					}))
				);
		})();
	}, [selectedYear]);

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
					events={vacations}
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
