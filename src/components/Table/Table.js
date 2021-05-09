import './Table.css';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import React from 'react';

export default function Table(props) {
	return (
		<table className="station-table">
			<TableHead stationName={props.stationName} />
			<TableBody
				currentlyDragged={props.currentlyDragged}
				selectedSchedule={props.selectedSchedule}
				editSchedule={props.editSchedule}
				setCurrentlyDragged={props.setCurrentlyDragged}
				stationName={props.stationName}
			/>
		</table>
	);
}
