import './Tables.css';
import React from 'react';
import Table from '../Table/Table';
import SelectDate from '../SelectDate/SelectDate';

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
		<div className="tables-section">
			<SelectDate
				setDateSelected={props.setDateSelected}
				dateSelected={props.dateSelected}
				formatDateString={props.formatDateString}
			/>
			{(tables.length && tables) || 'Loading...'}
		</div>
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
