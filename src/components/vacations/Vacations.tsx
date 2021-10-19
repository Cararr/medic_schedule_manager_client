import React, { useState, useEffect } from 'react';
import { NavBar } from '../navBar/NavBar';
import './Vacations.css';
import FullCalendar, {
	DatesSetArg,
	EventApi,
	EventContentArg,
	EventDropArg,
	EventInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
	EventResizeDoneArg,
} from '@fullcalendar/interaction';
import Get from '../../api/Get';
import Put from '../../api/Put';
import Utilities from '../../util/Utilities';
import { Vacation } from '../../types';
import { TiDelete } from 'react-icons/ti';
import Delete from '../../api/Delete';
import { warningMessage } from '../../WinBox/winboxMessages';
import { useUser } from '../../context/userContext';

export const Vacations: React.FunctionComponent = () => {
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [vacationEvents, setVacationEvents] = useState<EventInput[]>([]);

	const isMobileDevice = window.screen.width < 500;

	useEffect(() => {
		setVacationEvents([]);
		(async function () {
			const annualVacations = await Get.vacationsByYear(selectedYear);
			if (annualVacations)
				setVacationEvents(
					annualVacations.map((vacation: Vacation) => ({
						id: vacation.id.toString(),
						employee: vacation.employee,
						title: `${vacation.employee.firstName} ${vacation.employee.lastName}`,
						color: Utilities.returnColorPerEmployee(vacation.employee.lastName),
						textColor: Utilities.blackOrWhiteFontForContrast(
							Utilities.returnColorPerEmployee(vacation.employee.lastName)
						)
							? 'black'
							: 'white',
						start: vacation.from,
						end: Utilities.formatDateString(
							Utilities.addDay(new Date(vacation.to))
						),
					}))
				);
		})();
	}, [selectedYear]);

	const handleDatesSet = (date: DatesSetArg) => {
		const displayedYear = new Date(
			date.start.setMonth(date.start.getMonth() + 1)
		).getFullYear();
		if (displayedYear !== selectedYear) setSelectedYear(displayedYear);
	};

	const buttonsText = {
		today: 'dziś',
		prevYear: `${selectedYear - 1}`,
		nextYear: `${selectedYear + 1}`,
		prev: '◀',
		next: '▶',
	};

	const handleEventRemove = async (event: EventApi) => {
		const done = await Delete.vacation(event._def.publicId);
		if (done) {
			setVacationEvents((prev) =>
				prev.filter((vacation) => vacation.id !== event._def.publicId)
			);
		} else
			warningMessage(
				'Action aborted!',
				'Something went wrong, please try again later!',
				170
			);
	};

	const handleEventResizeAndDrop = async (
		eventInfo: EventResizeDoneArg | EventDropArg
	) => {
		const event = eventInfo.event;
		if (event._instance) {
			const vacation: Vacation = {
				id: Number(event._def.publicId),
				employee: event._def.extendedProps.employee,
				from: Utilities.formatDateString(event._instance?.range.start),
				to: Utilities.formatDateString(
					Utilities.subtractDay(event._instance?.range.end)
				),
			};

			const done = await Put.vacation(vacation);
			if (done)
				return setVacationEvents((prev) => {
					const updatedVacation = {
						...prev.find((event) => Number(event.id) === vacation.id),
						start: vacation.from,
						end: Utilities.formatDateString(
							Utilities.addDay(new Date(vacation.to))
						),
					};
					return [
						...[...prev].filter((event) => Number(event.id) !== vacation.id),
						updatedVacation,
					];
				});
		}

		eventInfo.revert();
	};

	const isUserBoss = Utilities.checkIfUserIsAdmin(useUser().user);

	const eventContent = (eventContentArg: EventContentArg) => (
		<div className="calendar-event">
			<p
				style={{
					cursor: isUserBoss ? 'grab' : 'initial',
				}}
				onMouseDown={
					isUserBoss
						? (e: React.SyntheticEvent) => {
								changeGrabCursor(e.target as HTMLElement, 'grabbing');
						  }
						: undefined
				}
				onMouseUp={
					isUserBoss
						? (e: React.SyntheticEvent) => {
								changeGrabCursor(e.target as HTMLElement, 'grab');
						  }
						: undefined
				}
				className="tittle-calendar-event"
			>
				{eventContentArg.event.title}
			</p>
			{isUserBoss && !isMobileDevice && (
				<button
					onClick={() => handleEventRemove(eventContentArg.event)}
					className="button-calendar-remove-event"
				>
					{eventContentArg.isEnd && (
						<TiDelete style={{ color: 'white', fontSize: '1rem' }} />
					)}
				</button>
			)}
		</div>
	);

	return (
		<div>
			<NavBar />
			<main className="main-calendar">
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin]}
					locale={'pl'}
					height="auto"
					firstDay={1}
					headerToolbar={{
						left: !isMobileDevice ? 'prevYear nextYear' : '',
						center: 'title',
					}}
					stickyHeaderDates={!isMobileDevice}
					buttonText={buttonsText}
					events={vacationEvents}
					eventContent={eventContent}
					datesSet={handleDatesSet}
					// weekends={false}
					editable={isUserBoss && !isMobileDevice}
					eventAllow={(dropInfo) => {
						return ![0, 6].includes(dropInfo.start.getDay());
					}}
					eventDragMinDistance={1}
					eventDragStop={({ el }) => {
						changeGrabCursor(
							el.firstChild?.firstChild?.firstChild as HTMLElement,
							'grab'
						);
					}}
					eventDrop={handleEventResizeAndDrop}
					eventResizableFromStart
					eventResize={handleEventResizeAndDrop}
				/>
			</main>
		</div>
	);
};

function changeGrabCursor(element: HTMLElement, grabType: 'grab' | 'grabbing') {
	element.style.cursor = grabType;
}
