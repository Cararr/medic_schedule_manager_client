import React, { ChangeEvent } from 'react';
import { Table } from './Table';
import { HomeRehabilitations } from '../schedulesView/HomeRehabilitationsView';
import { useUser } from '../../context/userContext';
import Utilities from '../../util/Utilities';
import {
	Schedules,
	StationName,
	WorkStageSpans,
	Employee,
	HomeRehabilitation,
	Comment,
} from '../../types';
import './Tables.css';

interface Props {
	schedules: Schedules;
	checkForSchedulesChanges?: (
		comment?: Comment,
		homeRehabilitations?: HomeRehabilitation[]
	) => void;
	currentlyDragged: string;
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
	editCells: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void;
	workStageSpans: WorkStageSpans[];
	handleHomeRehabilitationChanges?: (
		{ target }: ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
	removeHomeRehabilitation?: (
		homeRehabilitation: HomeRehabilitation
	) => Promise<void>;
	handleCommentChanges?: ({ target }: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Tables: React.FunctionComponent<Props> = (props) => {
	const tables: JSX.Element[] = [];
	for (const station in props.schedules.stationSchedules) {
		const index = returnIndexByStation(station);
		if (index !== undefined)
			tables[index] = (
				<Table
					key={station}
					stationSchedule={props.schedules.stationSchedules[station]}
					checkForSchedulesChanges={props.checkForSchedulesChanges}
					editCells={props.editCells}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					stationName={station}
					workStageSpans={props.workStageSpans}
				/>
			);
	}

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());
	const isLoading = !Boolean(props.workStageSpans?.length);
	const loading = (
		<i
			style={{ marginTop: '4rem', fontSize: '4rem', display: 'block' }}
			className="icon-spin6"
		/>
	);

	return isLoading ? (
		loading
	) : (
		<section>
			{tables}
			{props.schedules.homeRehabilitations &&
				props.schedules.homeRehabilitations.length !== 0 &&
				props.handleHomeRehabilitationChanges &&
				props.removeHomeRehabilitation && (
					<HomeRehabilitations
						isUserAdmin={isUserAdmin}
						editCells={props.editCells}
						checkForSchedulesChanges={props.checkForSchedulesChanges}
						currentlyDragged={props.currentlyDragged}
						setCurrentlyDragged={props.setCurrentlyDragged}
						homeRehabilitations={props.schedules.homeRehabilitations}
						handleHomeRehabilitationChanges={
							props.handleHomeRehabilitationChanges
						}
						removeHomeRehabilitation={props.removeHomeRehabilitation}
					/>
				)}
			{props.handleCommentChanges &&
				(props.schedules.comment?.content || isUserAdmin) && (
					<form className="form-comments">
						<h3>COMMENTS</h3>
						<textarea
							rows={10}
							maxLength={450}
							value={props.schedules.comment?.content}
							onChange={props.handleCommentChanges}
							readOnly={!isUserAdmin}
							className="textarea-comments"
						/>
					</form>
				)}
		</section>
	);
};

function returnIndexByStation(stationName: string) {
	switch (stationName) {
		case StationName.KINEZA:
			return 0;
		case StationName.FIZYKO:
			return 1;
		case StationName.MASAZ:
			return 2;
		case StationName.WIZYTY:
			return 3;
		default:
			console.error('Station name not recognized.');
	}
}
