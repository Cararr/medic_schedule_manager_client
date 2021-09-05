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

	const [initialSchedule, setInitialSchedules] = useState<Schedules>(
		returnEmptySchedules(dateSelected)
	);

	const [schedules, setSchedules] = useState<Schedules>(
		returnEmptySchedules(dateSelected)
	);

	const [wasScheduleEdited, setWasScheduleEdited] = useState(false);

	const [currentlyDragged, setCurrentlyDragged] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const [workStageSpans, setworkStageSpans] = useState<WorkStageSpans[]>([]);

	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
	}, []);

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
		})();
	}, [dateSelected]);

	const changeCellValue = (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => {
		setSchedules((prev) => {
			const updatedSchedule = { ...prev };
			if (stationName === 'homeRehabilitations') {
				updatedSchedule.homeRehabilitations[cellNumber].employee = newCellValue;
			} else
				updatedSchedule.stationSchedules[stationName][cellNumber] =
					newCellValue;

			return updatedSchedule;
		});
	};

	const checkForSchedulesChanges = (
		comment: Comment = schedules.comment,
		homeRehabilitations: HomeRehabilitation[] = schedules.homeRehabilitations
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
		}

		for (const [index, homeRehabilitaiton] of homeRehabilitations.entries()) {
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

		if (initialSchedule.comment.content !== comment.content)
			return setWasScheduleEdited(true);

		return setWasScheduleEdited(false);
	};

	const saveScheudles = async () => {
		for (const homeRehabilitation of schedules.homeRehabilitations) {
			if (!homeRehabilitation.employee)
				return warningMessage(
					'Employee is missing',
					'An employee must be present at home rehabilitation!',
					170
				);
		}

		setIsLoading(true);

		await Put.schedule(dateSelected, schedules.stationSchedules);

		for (const [
			index,
			homeRehabilitation,
		] of schedules.homeRehabilitations.entries()) {
			const initialHomeRehabilitation =
				initialSchedule.homeRehabilitations[index];
			if (
				initialHomeRehabilitation.startTime !== homeRehabilitation.startTime ||
				initialHomeRehabilitation.employee?.id !==
					homeRehabilitation.employee?.id ||
				initialHomeRehabilitation.patient !== homeRehabilitation.patient
			)
				await Put.homeRehabilitation(homeRehabilitation);
		}

		if (initialSchedule.comment.content !== schedules.comment.content) {
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
		}

		setInitialSchedules({
			stationSchedules: cloneDeep(schedules.stationSchedules),
			homeRehabilitations: cloneDeep(schedules.homeRehabilitations),
			comment: cloneDeep(schedules.comment),
		});
		setWasScheduleEdited(false);
		setIsLoading(false);
	};

	const handleCommentChanges = ({
		target,
	}: ChangeEvent<HTMLTextAreaElement>) => {
		const comment = { ...schedules.comment, content: target.value };
		setSchedules((prev) => ({ ...prev, comment }));
		checkForSchedulesChanges(comment);
	};

	const handleHomeRehabilitationChanges = (
		{ target }: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
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

		const homeRehabilitations = cloneDeep(schedules.homeRehabilitations);
		homeRehabilitations[index] = changedHomeRehabilitaiton;

		setSchedules((prev) => {
			return { ...prev, homeRehabilitations };
		});

		checkForSchedulesChanges(schedules.comment, homeRehabilitations);
	};

	const removeHomeRehabilitation = async (
		homeRehabilitation: HomeRehabilitation
	) => {
		if (await Delete.homeRehabilitation(homeRehabilitation)) {
			setSchedules((prev) => ({
				...prev,
				homeRehabilitations: prev.homeRehabilitations.filter(
					(hR: HomeRehabilitation) => hR.id !== homeRehabilitation.id
				),
			}));
		} else {
			return warningMessage(
				'Action aborted!',
				'Something went wrong, please try again later!',
				170
			);
		}
	};

	const printSchedules = () => {
		const pageTitle = document.title;
		const root = document.querySelector('html');
		document.title = `Schedules for: ${dateSelected}`;
		root!.style.fontSize = '19px';
		window.print();
		document.title = pageTitle;
		root!.style.fontSize = '22px';
	};

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<div>
			<NavBar />
			<div className="container-schedules">
				{isUserAdmin && (
					<EmployeesList
						stationSchedules={schedules.stationSchedules}
						homeRehabilitations={schedules.homeRehabilitations}
						checkForSchedulesChanges={checkForSchedulesChanges}
					/>
				)}
				<main className="main-schedules">
					<SelectDate
						setDateSelected={setDateSelected}
						dateSelected={dateSelected}
					/>
					<Tables
						schedules={schedules}
						checkForSchedulesChanges={checkForSchedulesChanges}
						currentlyDragged={currentlyDragged}
						setCurrentlyDragged={setCurrentlyDragged}
						changeCellValue={changeCellValue}
						workStageSpans={workStageSpans}
						handleHomeRehabilitationChanges={handleHomeRehabilitationChanges}
						removeHomeRehabilitation={removeHomeRehabilitation}
						handleCommentChanges={handleCommentChanges}
					/>
				</main>
				{isUserAdmin && (
					<ActionPanel
						wasScheduleEdited={wasScheduleEdited}
						saveScheudles={saveScheudles}
						printSchedules={printSchedules}
						isLoading={isLoading}
					/>
				)}
			</div>
		</div>
	);
};

function returnEmptySchedules(dateSelected: string) {
	return {
		stationSchedules: Utilities.returnEmptyStationSchedules(),
		homeRehabilitations: [],
		comment: Utilities.returnEmptyComment(dateSelected),
	};
}
