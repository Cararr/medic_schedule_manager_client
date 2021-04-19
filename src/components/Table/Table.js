import './Table.css';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import React from 'react';

export default function Table(props) {
	return (
		<table className="station_table">
			<TableHead stationName={props.stationName} />
			<TableBody
				currentlyDragged={props.currentlyDragged}
				setCurrentlyDragged={props.setCurrentlyDragged}
				changeDailyShift={props.changeDailyShift}
				stationName={props.stationName}
			/>
		</table>
	);
}
