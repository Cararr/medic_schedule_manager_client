import React, { useState, useEffect, ChangeEvent } from 'react';
import Get from '../../api/Get';
import Post from '../../api/Post';
import Put from '../../api/Put';
import Delete from '../../api/Delete';
import { EmployeesList } from './EmployeesList';
import { Tables } from '../tables/Tables';
import { ActionPanel } from '../tables/ActionPanel';
import { NavBar } from '../navBar/NavBar';
import { SelectDate } from '../tables/SelectDate';
import Utilities from '../../util/Utilities';
import { useUser } from '../../context/userContext';
import { warningMessage } from '../../WinBox/winboxMessages';
import {
	Employee,
	HomeRehabilitation,
	WorkStageSpans,
	CompleteSchedule,
	Comment,
} from '../../types';
import _ from 'lodash';
import './Schedules.css';

export const Schedules: React.FunctionComponent = () => {
	const [dateSelected, setDateSelected] = useState(
		Utilities.formatDateString(new Date())
	);

	const [initialSchedule, setInitialSchedule] = useState({
		schedules: Utilities.returnEmptyDailyShift(),
	});
	const [currentSchedule, setCurrentSchedule] = useState<CompleteSchedule>({
		schedules: Utilities.returnEmptyDailyShift(),
		homeRehabilitations: [],
	});
	const [wasScheduleEdited, setWasScheduleEdited] = useState(false);
	const editSchedule = (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => {
		setCurrentSchedule((prev) => {
			const updatedSchedule = { ...prev };
			if (stationName === 'homeRehabilitations') {
				updatedSchedule.homeRehabilitations[cellNumber].employee = newCellValue;
				setHomeRehabilitationsEdited((prev) => [
					...prev,
					currentSchedule.homeRehabilitations[cellNumber].id,
				]);
			} else {
				if (!wasScheduleEdited) setWasScheduleEdited(true);
				updatedSchedule.schedules[stationName][cellNumber] = newCellValue;
			}
			return updatedSchedule;
		});
	};
	const saveScheudle = async () => {
		setWasScheduleEdited(false);
		if (currentSchedule.schedules)
			await Put.schedule(dateSelected, currentSchedule.schedules);
	};
	const [currentlyDragged, setCurrentlyDragged] = useState('');

	const [comment, setComment] = useState<Comment>(
		Utilities.returnEmptyComment(dateSelected)
	);
	const [wasCommentEdited, setWasCommentEdited] = useState(false);
	const saveComment = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setWasCommentEdited(false);
		if (comment.id && !comment.content) {
			await Delete.comment(comment);
			setComment(Utilities.returnEmptyComment(dateSelected));
		} else if (comment.id) await Put.comment(comment);
		else {
			const createdComment: Comment = await Post.comment(comment);
			setComment(createdComment);
		}
	};
	const handleEditComment = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
		if (!wasCommentEdited) setWasCommentEdited(true);
		setComment((prev) => ({ ...prev, content: target.value }));
	};

	const [homeRehabilitationsEdited, setHomeRehabilitationsEdited] = useState<
		number[]
	>([]);
	const removeHomeRehabilitation = async (
		homeRehabilitation: HomeRehabilitation
	) => {
		if (await Delete.homeRehabilitation(homeRehabilitation)) {
			setHomeRehabilitationsEdited((prev) =>
				prev.filter((id) => id !== homeRehabilitation.id)
			);
			setCurrentSchedule((prev) => ({
				...prev,
				homeRehabilitations: prev.homeRehabilitations.filter(
					(hR: HomeRehabilitation) => hR.id !== homeRehabilitation.id
				),
			}));
		} else
			warningMessage('Error', 'Action aborted, something went wrong. Sorry!');
	};
	const saveHomeRehabilitationChanges = async (
		homeRehabilitation: HomeRehabilitation
	) => {
		if (!homeRehabilitation.employee)
			warningMessage(
				'Employee is missing',
				'An employee must be present at home rehabilitation!'
			);
		else if (await Put.homeRehabilitation(homeRehabilitation))
			setHomeRehabilitationsEdited((prev) =>
				prev.filter((id) => id !== homeRehabilitation.id)
			);
	};
	const handleHomeRehabilitationEdit = (
		{ target }: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		setHomeRehabilitationsEdited((prev) => [
			...prev,
			currentSchedule.homeRehabilitations[index].id,
		]);
		setCurrentSchedule((prev) => {
			const homeRehabilitations = prev.homeRehabilitations;
			switch (target.name) {
				case 'startTime':
					homeRehabilitations[index].startTime = `${target.value}:00`;
					break;
				case 'patient':
					homeRehabilitations[index].patient = target.value;
					break;
			}
			return { ...prev, homeRehabilitations };
		});
	};

	const [workStageSpans, setworkStageSpans] = useState<WorkStageSpans[]>([]);
	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
	}, []);

	useEffect(() => {
		setWasScheduleEdited(false);
		setWasCommentEdited(false);
		(async function () {
			const schedules = await Get.schedulesByDate(dateSelected);
			const homeRehabilitations = await Get.homeRehabilitationsByDate(
				dateSelected
			);
			const comment = await Get.commentByDate(dateSelected);
			setComment(comment || Utilities.returnEmptyComment(dateSelected));
			setInitialSchedule({ schedules });
			setCurrentSchedule({
				schedules: _.cloneDeep(schedules),
				homeRehabilitations,
			});
			setHomeRehabilitationsEdited([]);
		})();
	}, [dateSelected]);

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<div>
			<NavBar />
			<div className="schedules">
				{isUserAdmin && <EmployeesList currentSchedule={currentSchedule} />}
				<main className="section-schedules-central">
					<SelectDate
						setDateSelected={setDateSelected}
						dateSelected={dateSelected}
					/>

					<Tables
						currentlyDragged={currentlyDragged}
						setCurrentlyDragged={setCurrentlyDragged}
						currentSchedule={currentSchedule}
						editSchedule={editSchedule}
						workStageSpans={workStageSpans}
						homeRehabilitationsEdited={homeRehabilitationsEdited}
						handleHomeRehabilitationEdit={handleHomeRehabilitationEdit}
						removeHomeRehabilitation={removeHomeRehabilitation}
						saveHomeRehabilitationChanges={saveHomeRehabilitationChanges}
						comment={comment}
						wasCommentEdited={wasCommentEdited}
						handleEditComment={handleEditComment}
						saveComment={saveComment}
					/>
				</main>
				{isUserAdmin && (
					<ActionPanel
						wasScheduleEdited={wasScheduleEdited}
						saveScheudle={saveScheudle}
					/>
				)}
			</div>
		</div>
	);
};
