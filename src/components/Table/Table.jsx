import React from 'react';
import TableHead from '../TableHead/TableHead.jsx';
import TableCell from '../TableCell/TableCell.jsx';
import TableCellBlank from '../TableCellBlank/TableCellBlank.jsx';
import './Table.css';

export default function Table(props) {
	let tableBody = returntableBodyByStation(
		props.stationName,
		props.selectedSchedule,
		props.editSchedule,
		props.currentlyDragged,
		props.setCurrentlyDragged
	);
	return (
		<table className="station-table">
			<TableHead
				workStageSpans={props.workStageSpans}
				stationName={props.stationName}
			/>
			{tableBody}
		</table>
	);
}

function returntableBodyByStation(
	station,
	selectedSchedule,
	editSchedule,
	currentlyDragged,
	setCurrentlyDragged
) {
	let cellCounter = 0,
		tableBody;
	const cells = selectedSchedule.map(() => {
		return (
			<TableCell
				stationName={station}
				editSchedule={editSchedule}
				id={`${station}-${cellCounter}`}
				cellValue={selectedSchedule[cellCounter]}
				key={cellCounter}
				cellNumber={cellCounter++}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
			/>
		);
	});
	switch (station) {
		case 'KINEZA':
			tableBody = (
				<tbody>
					<tr>{cells.slice(0, 4)}</tr>
					<tr>{cells.slice(4, 8)}</tr>
					<tr>
						<TableCellBlank />
						{cells.slice(8, 10)}
						<TableCellBlank />
					</tr>
					<tr>
						<TableCellBlank />
						{cells.slice(10)}
					</tr>
				</tbody>
			);
			break;
		case 'FIZYKO':
			tableBody = (
				<tbody>
					<tr>{cells.slice(0, 4)}</tr>
					<tr>{cells.slice(4, 8)}</tr>
					<tr>
						<TableCellBlank />
						{cells.slice(8)}
					</tr>
				</tbody>
			);
			break;
		case 'MASAZ':
			tableBody = (
				<tbody>
					<tr>{cells.slice(0)}</tr>
				</tbody>
			);
			break;
		case 'WIZYTY':
			tableBody = (
				<tbody>
					<tr>{cells.slice(0)}</tr>
				</tbody>
			);
			break;
		default:
			return;
	}
	return tableBody;
}
