import React, { useState, useEffect, ChangeEvent } from 'react';
import Get from '../../util/api/Get';
import Put from '../../util/api/Put';
import Delete from '../../util/api/Delete';
import { EmployeesList } from './EmployeesList';
import { Tables } from '../tables/Tables';
import { ActionPanel } from '../tables/ActionPanel';
import { NavBar } from '../navBar/NavBar';
import { SelectDate } from '../tables/SelectDate';
import Utilities from '../../util/Utilities';
import { useUser } from '../../context/userContext';
import { genericWarning, noEmployeeWarning } from '../../WinBox/winboxMessages';
import {
	Employee,
	HomeRehabilitation,
	WorkStageSpans,
	CompleteSchedule,
	Comment,
} from '../../types';
import './Schedules.css';

export const Schedules: React.FunctionComponent = () => {
	const [currentSchedule, setCurrentSchedule] = useState<CompleteSchedule>({
		schedules: Utilities.returnEmptyDailyShift(),
		homeRehabilitations: [],
	});
	const [wasScheduleEdited, setWasScheduleEdited] = useState(false);

	const [comment, setComment] = useState<Comment>(
		Utilities.returnEmptyComment()
	);
	const [wasCommentEdited, setWasCommentEdited] = useState(false);
	//ZAPISYWANIE: JEŻELI KOMENT O TMY ID BYŁ TO PUT JAK NIE TO POST
	const handleEditComment = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
		if (!wasCommentEdited) setWasCommentEdited(true);
		setComment((prev) => ({ ...prev, content: target.value }));
	};

	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dateSelected, setDateSelected] = useState(
		Utilities.formatDateString(new Date())
	);
	console.log(comment);

	const [homeRehabilitationsEdited, setHomeRehabilitationsEdited] = useState<
		number[]
	>([]);

	const removeHomeRehabilitation = async (homeRehabilitationId: number) => {
		if (await Delete.homeRehabilitation(homeRehabilitationId)) {
			setHomeRehabilitationsEdited((prev) =>
				prev.filter((id) => id !== homeRehabilitationId)
			);
			setCurrentSchedule((prev) => ({
				...prev,
				homeRehabilitations: prev.homeRehabilitations.filter(
					(hR: HomeRehabilitation) => hR.id !== homeRehabilitationId
				),
			}));
		} else genericWarning();
	};

	useEffect(() => {
		setWasScheduleEdited(false);
		setWasCommentEdited(false);
		(async function () {
			const schedules = await Get.schedulesByDate(dateSelected);
			const homeRehabilitations = await Get.homeRehabilitationsByDate(
				dateSelected
			);
			const comment = await Get.commentByDate(dateSelected);
			setComment(comment || Utilities.returnEmptyComment());
			setCurrentSchedule({ schedules, homeRehabilitations });
			setHomeRehabilitationsEdited([]);
		})();
	}, [dateSelected]);

	const [workStageSpans, setworkStageSpans] = useState<WorkStageSpans[]>([]);
	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
	}, []);

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

	const saveChangedHomeRehabilitation = async (
		homeRehabilitation: HomeRehabilitation
	) => {
		if (!homeRehabilitation.employee) return noEmployeeWarning();
		if (await Put.homeRehabilitation(homeRehabilitation))
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
						saveChangedHomeRehabilitation={saveChangedHomeRehabilitation}
						comment={comment}
						wasCommentEdited={wasCommentEdited}
						handleEditComment={handleEditComment}
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
