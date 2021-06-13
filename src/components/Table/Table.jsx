import React from 'react';
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
			<thead>
				<tr>
					<td className="table-title" colSpan={4}>
						{props.stationName}
					</td>
				</tr>
				<tr>{returnWorkStageSpans(props.workStageSpans, props.stationName)}</tr>
			</thead>
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
function returnWorkStageSpans(workStageSpans, stationName) {
	return workStageSpans?.map((stage, index) => {
		if (stationName === 'WIZYTY' && index !== 2) return false;
		return <td key={stage.id}>{`${stage.from} - ${stage.to}`}</td>;
	});
}
