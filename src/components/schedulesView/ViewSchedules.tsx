import React, { useState, useEffect, ChangeEvent } from 'react';
import Get from '../../api/Get';
import Post from '../../api/Post';
import Put from '../../api/Put';
import Delete from '../../api/Delete';
import { EmployeesList } from './EmployeesList';
import { Tables } from '../tables/Tables';
import { ActionPanel } from '../tables/ActionPanel';
import { NavBar } from '../navBar/NavBar';
import { SelectDate } from './SelectDate';
import Utilities from '../../util/Utilities';
import { useUser } from '../../context/userContext';
import { warningMessage } from '../../WinBox/winboxMessages';
import {
	Employee,
	Schedules,
	HomeRehabilitation,
	WorkStageSpans,
	Comment,
} from '../../types';
import { cloneDeep } from 'lodash';

export const ViewSchedules: React.FunctionComponent = () => {
	const [dateSelected, setDateSelected] = useState(
		Utilities.formatDateString(new Date())
	);

	const [workStageSpans, setworkStageSpans] = useState<WorkStageSpans[]>([]);

	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
	}, []);

	const [initialSchedule, setInitialSchedules] = useState<Schedules>({
		stationSchedules: Utilities.returnEmptyDailyShift(),
		homeRehabilitations: [],
		comment: Utilities.returnEmptyComment(dateSelected),
	});

	const [schedules, setSchedules] = useState<Schedules>({
		stationSchedules: Utilities.returnEmptyDailyShift(),
		homeRehabilitations: [],
		comment: Utilities.returnEmptyComment(dateSelected),
	});

	const [wasScheduleEdited, setWasScheduleEdited] = useState(false);

	const editCells = (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => {
		setSchedules((prev) => {
			const updatedSchedule = { ...prev };
			if (stationName === 'homeRehabilitations') {
				updatedSchedule.homeRehabilitations[cellNumber].employee = newCellValue;
				setHomeRehabilitationsEdited((prev) => [
					...prev,
					schedules.homeRehabilitations[cellNumber].id,
				]);
			} else
				updatedSchedule.stationSchedules[stationName][cellNumber] =
					newCellValue;

			return updatedSchedule;
		});
	};

	const checkForSchedulesChanges = (
		newEntity?: HomeRehabilitation | Comment
	) => {
		for (const station in initialSchedule.stationSchedules) {
			if (
				Object.prototype.hasOwnProperty.call(
					initialSchedule.stationSchedules,
					station
				)
			) {
				const initialStationCells = initialSchedule.stationSchedules[station];
				const updatedStationCells = schedules.stationSchedules[station];

				for (const [index, cellValue] of updatedStationCells.entries()) {
					if (initialStationCells[index]?.id !== cellValue?.id)
						return setWasScheduleEdited(true);
				}
			}
			// CHYBA JAKIEŚ PORÓWNANIE DO NEWENITYT BĘDZIE MUSIAŁO BYĆ :(
			for (const [
				index,
				homeRehabilitaiton,
			] of schedules.homeRehabilitations.entries()) {
				if (
					initialSchedule.homeRehabilitations[index].startTime !==
						homeRehabilitaiton.startTime ||
					initialSchedule.homeRehabilitations[index].employee?.id !==
						homeRehabilitaiton.employee?.id ||
					initialSchedule.homeRehabilitations[index].patient !==
						homeRehabilitaiton.patient
				)
					return setWasScheduleEdited(true);
			}
		}

		if (initialSchedule.comment.content !== schedules.comment.content)
			return setWasScheduleEdited(true);

		return setWasScheduleEdited(false);
	};

	const saveScheudles = async () => {
		setWasScheduleEdited(false);

		await Put.schedule(dateSelected, schedules.stationSchedules);

		if (schedules.comment.id && !schedules.comment.content) {
			await Delete.comment(schedules.comment);
			setSchedules((prev) => ({
				...prev,
				comment: Utilities.returnEmptyComment(dateSelected),
			}));
		} else if (schedules.comment.id) await Put.comment(schedules.comment);
		else {
			const comment: Comment = await Post.comment(schedules.comment);
			setSchedules((prev) => ({
				...prev,
				comment,
			}));
		}

		setInitialSchedules({
			stationSchedules: cloneDeep(schedules.stationSchedules),
			homeRehabilitations: cloneDeep(schedules.homeRehabilitations),
			comment: cloneDeep(schedules.comment),
		});
	};

	const [currentlyDragged, setCurrentlyDragged] = useState('');

	const handleCommentChanges = ({
		target,
	}: ChangeEvent<HTMLTextAreaElement>) => {
		const comment = { ...schedules.comment, content: target.value };
		setSchedules((prev) => ({ ...prev, comment }));
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
			setSchedules((prev) => ({
				...prev,
				homeRehabilitations: prev.homeRehabilitations.filter(
					(hR: HomeRehabilitation) => hR.id !== homeRehabilitation.id
				),
			}));
		} else
			warningMessage(
				'Action aborted!',
				'Something went wrong, please try again later.'
			);
	};

	/* const saveHomeRehabilitationChanges = async (
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
	}; */

	const handleHomeRehabilitationChanges = (
		{ target }: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		setHomeRehabilitationsEdited((prev) => [
			...prev,
			schedules.homeRehabilitations[index].id,
		]);

		const changedHomeRehabilitaiton = {
			...schedules.homeRehabilitations[index],
		};
		switch (target.name) {
			case 'startTime':
				changedHomeRehabilitaiton.startTime = `${target.value}:00`;
				break;
			case 'patient':
				changedHomeRehabilitaiton.patient = target.value;
				break;
		}

		setSchedules((prev) => {
			const homeRehabilitations = cloneDeep(prev.homeRehabilitations);
			homeRehabilitations[index] = changedHomeRehabilitaiton;
			return { ...prev, homeRehabilitations };
		});
	};

	useEffect(() => {
		setWasScheduleEdited(false);
		(async function () {
			const stationSchedules = await Get.schedulesByDate(dateSelected);
			const homeRehabilitations = await Get.homeRehabilitationsByDate(
				dateSelected
			);
			const comment =
				(await Get.commentByDate(dateSelected)) ||
				Utilities.returnEmptyComment(dateSelected);
			setInitialSchedules({ stationSchedules, homeRehabilitations, comment });
			setSchedules({
				stationSchedules: cloneDeep(stationSchedules),
				homeRehabilitations: cloneDeep(homeRehabilitations),
				comment: cloneDeep(comment),
			});
			setHomeRehabilitationsEdited([]);
		})();
	}, [dateSelected]);

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<div>
			<NavBar />
			<div className="schedules">
				{isUserAdmin && (
					<EmployeesList
						checkForSchedulesChanges={checkForSchedulesChanges}
						stationSchedules={schedules.stationSchedules}
					/>
				)}
				<main className="section-schedules-central">
					<SelectDate
						setDateSelected={setDateSelected}
						dateSelected={dateSelected}
					/>

					<Tables
						currentlyDragged={currentlyDragged}
						setCurrentlyDragged={setCurrentlyDragged}
						stationSchedules={schedules.stationSchedules}
						editCells={editCells}
						checkForSchedulesChanges={checkForSchedulesChanges}
						workStageSpans={workStageSpans}
						homeRehabilitations={schedules.homeRehabilitations}
						homeRehabilitationsEdited={homeRehabilitationsEdited}
						handleHomeRehabilitationChanges={handleHomeRehabilitationChanges}
						removeHomeRehabilitation={removeHomeRehabilitation}
						comment={schedules.comment}
						handleCommentChanges={handleCommentChanges}
					/>
				</main>
				{isUserAdmin && (
					<ActionPanel
						wasScheduleEdited={wasScheduleEdited}
						saveScheudles={saveScheudles}
					/>
				)}
			</div>
		</div>
	);
};
