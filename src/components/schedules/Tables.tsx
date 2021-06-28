import React, { ChangeEvent } from 'react';
import { Table } from './Table';
import { SelectDate } from './SelectDate';
import { HomeRehabilitations } from './HomeRehabilitations';
import { useUser } from '../../context/userContext';
import Utilities from '../../util/util';
import { CurrentSchedule } from './Schedules';
import { WorkStageSpans, Employee, HomeRehabilitation } from '../../types';
import './Tables.css';

interface Props {
	currentlyDragged: string;
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
	dateSelected: string;
	setDateSelected: React.Dispatch<React.SetStateAction<string>>;
	currentSchedule: CurrentSchedule;
	editSchedule: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void;
	workStageSpans: WorkStageSpans[];
	homeRehabilitationsEdited: number[];
	handleHomeRehabilitationEdit: (
		{ target }: ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
	removeHomeRehabilitation: (homeRehabilitationId: number) => Promise<void>;
	saveChangedHomeRehabilitation: (
		homeRehabilitation: HomeRehabilitation
	) => Promise<void>;
}

export const Tables: React.FunctionComponent<Props> = (props) => {
	const tables: JSX.Element[] = [];
	for (const station in props.currentSchedule.schedules) {
		const index = returnIndexByStation(station);
		if (index)
			tables[index] = (
				<Table
					key={station}
					stationSchedule={props.currentSchedule.schedules[station]}
					editSchedule={props.editSchedule}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					stationName={station}
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
			/>
			{(props.currentSchedule.schedules && tables) || (
				<i style={{ marginTop: '4rem' }} className="icon-spin6" />
			)}
			{props.currentSchedule.homeRehabilitations.length !== 0 && (
				<HomeRehabilitations
					isUserAdmin={isUserAdmin}
					editSchedule={props.editSchedule}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					homeRehabilitations={props.currentSchedule.homeRehabilitations}
					handleHomeRehabilitationEdit={props.handleHomeRehabilitationEdit}
					homeRehabilitationsEdited={props.homeRehabilitationsEdited}
					removeHomeRehabilitation={props.removeHomeRehabilitation}
					saveChangedHomeRehabilitation={props.saveChangedHomeRehabilitation}
				/>
			)}
		</main>
	);
};

function returnIndexByStation(stationName: string) {
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
			console.error('Station name not recognized.');
	}
}
