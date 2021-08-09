import React from 'react';
import { TableCell } from './TableCell';
import './Table.css';
import {
	WorkStageSpans,
	Employee,
	StationName,
	HomeRehabilitation,
	Comment,
} from '../../types';

interface Props {
	stationName: string;
	stationSchedule: (Employee | null)[];
	checkForSchedulesChanges?: (
		comment?: Comment,
		homeRehabilitations?: HomeRehabilitation[]
	) => void;
	editCells: (
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
					{props.stationName === StationName.WIZYTY
						? [invisibleCell(0), invisibleCell(1)]
						: undefined}
					<td
						className=" table-title"
						colSpan={props.stationName === StationName.WIZYTY ? 1 : 4}
					>
						{props.stationName}
					</td>
				</tr>
				<tr>{returnWorkStageSpans(props.workStageSpans, props.stationName)}</tr>
			</thead>
			{returntableBodyByStation(
				props.stationName,
				props.stationSchedule,
				props.editCells,
				props.currentlyDragged,
				props.setCurrentlyDragged,
				props.checkForSchedulesChanges
			)}
		</table>
	);
};

function invisibleCell(key?: number) {
	return <td key={key} style={{ border: 'none' }} />;
}

function returnWorkStageSpans(
	workStageSpans: WorkStageSpans[],
	stationName: string
) {
	return workStageSpans?.map((stage, index) => {
		if (stationName === StationName.WIZYTY && index !== 2)
			return invisibleCell(index);
		return <td key={index}>{`${stage.from} - ${stage.to}`}</td>;
	});
}

function returntableBodyByStation(
	station: string,
	stationSchedule: (Employee | null)[],
	editCells: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void,
	currentlyDragged: string,
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>,
	checkForSchedulesChanges?: (
		comment?: Comment,
		homeRehabilitations?: HomeRehabilitation[]
	) => void
) {
	const cells = stationSchedule.map((cell, index) => {
		return (
			<TableCell
				key={index}
				cellNumber={index}
				stationName={station}
				editCells={editCells}
				cellValue={stationSchedule[index]}
				checkForSchedulesChanges={checkForSchedulesChanges}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
			/>
		);
	});

	switch (station) {
		case StationName.KINEZA:
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
		case StationName.FIZYKO:
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
		case StationName.MASAZ:
			return (
				<tbody>
					<tr>{cells.slice(0)}</tr>
				</tbody>
			);
		case StationName.WIZYTY:
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
