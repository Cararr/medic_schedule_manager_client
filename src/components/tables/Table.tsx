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
	return (
		<table className="table-station">
			<thead>
				<tr>
					{props.stationName === 'WIZYTY'
						? [invisibleCell(0), invisibleCell(1)]
						: undefined}
					<td
						className="table-title"
						colSpan={props.stationName === 'WIZYTY' ? 1 : 4}
					>
						{props.stationName}
					</td>
				</tr>
				<tr>{returnWorkStageSpans(props.workStageSpans, props.stationName)}</tr>
			</thead>
			{returntableBodyByStation(
				props.stationName,
				props.stationSchedule,
				props.editSchedule,
				props.currentlyDragged,
				props.setCurrentlyDragged
			)}
		</table>
	);
};

function invisibleCell(key?: number) {
	return <td key={key} style={{ border: 'none' }} className="blank_cell" />;
}

function returnWorkStageSpans(
	workStageSpans: WorkStageSpans[],
	stationName: string
) {
	return workStageSpans?.map((stage, index) => {
		if (stationName === 'WIZYTY' && index !== 2) return invisibleCell(index);
		return <td key={index}>{`${stage.from} - ${stage.to}`}</td>;
	});
}

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

	switch (station) {
		case 'KINEZA':
			return (
				<tbody>
					<tr>{cells.slice(0, 4)}</tr>
					<tr>{cells.slice(4, 8)}</tr>
					<tr>
						{invisibleCell()}
						{cells.slice(8, 10)}
						{invisibleCell()}
					</tr>
					<tr>
						{invisibleCell()}
						{cells.slice(10, 12)}
					</tr>
					<tr>
						{invisibleCell()}
						{cells.slice(12)}
					</tr>
				</tbody>
			);
		case 'FIZYKO':
			return (
				<tbody>
					<tr>{cells.slice(0, 4)}</tr>
					<tr>{cells.slice(4, 8)}</tr>
					<tr>
						{invisibleCell()}
						{cells.slice(8)}
					</tr>
				</tbody>
			);
		case 'MASAZ':
			return (
				<tbody>
					<tr>{cells.slice(0)}</tr>
				</tbody>
			);
		case 'WIZYTY':
			return (
				<tbody>
					<tr>
						{invisibleCell()}
						{invisibleCell()}
						{cells.slice(0)}
					</tr>
				</tbody>
			);
		default:
			return;
	}
}
