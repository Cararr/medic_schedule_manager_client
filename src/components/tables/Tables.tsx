import React, { ChangeEvent } from 'react';
import { Table } from './Table';
import { HomeRehabilitations } from 'components/schedulesView/HomeRehabilitationsView';
import { useUser } from 'providers/UserContext';
import Utilities from 'util/Utilities';
import {
	Schedules,
	StationName,
	WorkStageSpans,
	Employee,
	HomeRehabilitation,
	Comment,
} from 'types';
import './Tables.css';
import { CgSpinner } from 'react-icons/cg';

interface Props {
	schedules: Schedules;
	checkForSchedulesChanges?: (
		comment?: Comment,
		homeRehabilitations?: HomeRehabilitation[]
	) => void;
	currentlyDragged: string;
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
	changeCellValue: (
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
					changeCellValue={props.changeCellValue}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					stationName={station}
					workStageSpans={props.workStageSpans}
				/>
			);
	}

	const isUserBoss = Utilities.checkIfUserIsAdmin(useUser().user);
	const isLoading = !Boolean(props.workStageSpans?.length);
	const loading = (
		<CgSpinner
			className="spin"
			style={{
				marginTop: '4rem',
				fontSize: '6rem',
				display: 'block',
			}}
		/>
	);

	return isLoading ? (
		loading
	) : (
		<section className="section-tables">
			{tables}
			{props.schedules.homeRehabilitations &&
				props.schedules.homeRehabilitations.length !== 0 &&
				props.handleHomeRehabilitationChanges &&
				props.removeHomeRehabilitation && (
					<HomeRehabilitations
						isUserBoss={isUserBoss}
						changeCellValue={props.changeCellValue}
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
				(props.schedules.comment?.content || isUserBoss) && (
					<article
						className={`article-comments ${
							!props.schedules.comment?.content ? 'not-printable' : ''
						}`}
					>
						<header className="header-comments">
							<h3>Informacje</h3>
						</header>
						<textarea
							rows={10}
							maxLength={450}
							value={props.schedules.comment?.content}
							onChange={props.handleCommentChanges}
							readOnly={!isUserBoss}
							className="textarea-comments"
						/>
					</article>
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
