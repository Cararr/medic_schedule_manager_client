import React from 'react';
import { TableCell } from './TableCell';
import './Table.css';
import { WorkStageSpans, Employee } from '../../types';

interface Props {
	stationName: string;
	stationSchedule: (Employee | null)[];
	editSchedule: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void;
	currentlyDragged: string;
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
	workStageSpans: WorkStageSpans[];
}

export const Table: React.FunctionComponent<Props> = (props) => {
	let tableBody = returntableBodyByStation(
		props.stationName,
		props.stationSchedule,
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
};

function returntableBodyByStation(
	station: string,
	stationSchedule: (Employee | null)[],
	editSchedule: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void,
	currentlyDragged: string,
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>
) {
	const cells = stationSchedule.map((cell, index) => {
		return (
			<TableCell
				key={index}
				cellNumber={index}
				stationName={station}
				editSchedule={editSchedule}
				cellValue={stationSchedule[index]}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
			/>
		);
	});

	let tableBody: JSX.Element;
	switch (station) {
		case 'KINEZA':
			tableBody = (
				<tbody>
					<tr>{cells.slice(0, 4)}</tr>
					<tr>{cells.slice(4, 8)}</tr>
					<tr>
						{blankCell()}
						{cells.slice(8, 10)}
						{blankCell()}
					</tr>
					<tr>
						{blankCell()}
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
						{blankCell()}
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

function returnWorkStageSpans(
	workStageSpans: WorkStageSpans[],
	stationName: string
) {
	return workStageSpans?.map((stage, index) => {
		if (stationName === 'WIZYTY' && index !== 2) return false;
		return <td key={index}>{`${stage.from} - ${stage.to}`}</td>;
	});
}

function blankCell() {
	return <td style={{ border: 'none' }} className="blank_cell" />;
}
