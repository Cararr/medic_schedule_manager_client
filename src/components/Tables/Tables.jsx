import React from 'react';
import Table from '../Table/Table.jsx';
import SelectDate from '../SelectDate/SelectDate.jsx';
import HomeRehabilitaitons from '../HomeRehabilitaitons/HomeRehabilitaitons.jsx';
import './Tables.css';

export default function Tables(props) {
	const tables = new Array(4);
	for (const station in props.selectedSchedule) {
		tables[returnIndexByStation(station)] = (
			<Table
				selectedSchedule={props.selectedSchedule[station]}
				editSchedule={props.editSchedule}
				currentlyDragged={props.currentlyDragged}
				setCurrentlyDragged={props.setCurrentlyDragged}
				stationName={station}
				key={station}
				workStageSpans={props.workStageSpans}
			/>
		);
	}

	return (
		<main className="tables-section">
			<SelectDate
				setDateSelected={props.setDateSelected}
				dateSelected={props.dateSelected}
				formatDateString={props.formatDateString}
			/>
			{(tables.length && tables) || 'Loading...'}
			<HomeRehabilitaitons dateSelected={props.dateSelected} />
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
