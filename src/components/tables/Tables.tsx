import React, { ChangeEvent } from 'react';
import { Table } from './Table';
import { HomeRehabilitations } from '../schedulesView/HomeRehabilitationsView';
import { useUser } from '../../context/userContext';
import Utilities from '../../util/Utilities';
import {
	WorkStageSpans,
	Employee,
	HomeRehabilitation,
	CompleteSchedule,
	Comment,
} from '../../types';
import './Tables.css';

interface Props {
	currentlyDragged: string;
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
	currentSchedule: CompleteSchedule;
	editSchedule: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void;
	workStageSpans: WorkStageSpans[];
	homeRehabilitationsEdited?: number[];
	handleHomeRehabilitationEdit?: (
		{ target }: ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
	removeHomeRehabilitation?: (
		homeRehabilitation: HomeRehabilitation
	) => Promise<void>;
	saveHomeRehabilitationChanges?: (
		homeRehabilitation: HomeRehabilitation
	) => Promise<void>;
	comment?: Comment;
	wasCommentEdited?: boolean;
	handleEditComment?: ({ target }: ChangeEvent<HTMLTextAreaElement>) => void;
	saveComment?: (e: React.SyntheticEvent) => Promise<void>;
}

export const Tables: React.FunctionComponent<Props> = (props) => {
	const tables: JSX.Element[] = [];
	for (const station in props.currentSchedule.schedules) {
		const index = returnIndexByStation(station);
		if (index !== undefined)
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
	const isLoading = !Boolean(props.workStageSpans?.length);
	const loading = (
		<i
			style={{ marginTop: '4rem', fontSize: '4rem', display: 'block' }}
			className="icon-spin6"
		/>
	);

	return (
		<section>
			{isLoading ? loading : tables}
			{props.currentSchedule.homeRehabilitations.length !== 0 &&
				props.handleHomeRehabilitationEdit &&
				props.homeRehabilitationsEdited &&
				props.removeHomeRehabilitation &&
				props.saveHomeRehabilitationChanges && (
					<HomeRehabilitations
						isUserAdmin={isUserAdmin}
						editSchedule={props.editSchedule}
						currentlyDragged={props.currentlyDragged}
						setCurrentlyDragged={props.setCurrentlyDragged}
						homeRehabilitations={props.currentSchedule.homeRehabilitations}
						handleHomeRehabilitationEdit={props.handleHomeRehabilitationEdit}
						homeRehabilitationsEdited={props.homeRehabilitationsEdited}
						removeHomeRehabilitation={props.removeHomeRehabilitation}
						saveHomeRehabilitationChanges={props.saveHomeRehabilitationChanges}
					/>
				)}
			{/* Comments section only for view schedules */}
			{props.handleHomeRehabilitationEdit &&
				!isLoading &&
				(props.comment?.content || isUserAdmin) && (
					<form className="article-comments">
						<h3>COMMENTS</h3>
						<textarea
							required
							rows={10}
							maxLength={450}
							value={props.comment?.content}
							onChange={props.handleEditComment}
							readOnly={!isUserAdmin}
							className="textarea-comments"
						/>
						<button
							type="submit"
							onClick={props.saveComment}
							style={{ marginTop: '.5rem', fontSize: '1.2rem' }}
							disabled={!props.wasCommentEdited}
							className={`button-generic ${
								!props.wasCommentEdited && 'button-disabled'
							}`}
						>
							Save
						</button>
					</form>
				)}
		</section>
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
