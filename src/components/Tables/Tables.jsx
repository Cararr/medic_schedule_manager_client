import React from 'react';
import Table from '../Table/Table.jsx';
import SelectDate from '../SelectDate/SelectDate.jsx';
import HomeRehabilitaitons from '../HomeRehabilitaitons/HomeRehabilitaitons.jsx';
import { useUser } from '../../context/userContext';
import { Utilities } from '../../util/util';
import './Tables.css';

export default function Tables(props) {
	const tables = [];
	for (const station in props.currentSchedule.schedules) {
		tables[returnIndexByStation(station)] = (
			<Table
				stationSchedule={props.currentSchedule.schedules[station]}
				editSchedule={props.editSchedule}
				currentlyDragged={props.currentlyDragged}
				setCurrentlyDragged={props.setCurrentlyDragged}
				stationName={station}
				key={station}
				workStageSpans={props.workStageSpans}
			/>
		);
	}

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<main className="tables-section">
			<SelectDate
				setDateSelected={props.setDateSelected}
				dateSelected={props.dateSelected}
				formatDateString={props.formatDateString}
			/>
			{(props.currentSchedule.schedules && tables) || <h2>Loading...</h2>}
			{(props.currentSchedule.homeRehabilitations.length || isUserAdmin) && (
				<HomeRehabilitaitons
					isUserAdmin={isUserAdmin}
					editSchedule={props.editSchedule}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					homeRehabilitations={props.currentSchedule.homeRehabilitations}
					homeRehabilitationsEdited={props.homeRehabilitationsEdited}
					removeHomeRehabilitation={props.removeHomeRehabilitation}
					saveChangedHomeRehabilitation={props.saveChangedHomeRehabilitation}
				/>
			)}
		</main>
	);
}

function returnIndexByStation(stationName) {
	switch (stationName) {
		case 'KINEZA':
			return 0;
		case 'FIZYKO':
			return 1;
		case 'MASAZ':
			return 2;
		case 'WIZYTY':
			return 3;
		default:
			break;
	}
}
