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
} from '../../types';
import './Schedules.css';

export const Schedules: React.FunctionComponent = () => {
	const [currentSchedule, setCurrentSchedule] = useState<CompleteSchedule>({
		schedules: Utilities.returnEmptyDailyShiftObject(),
		homeRehabilitations: [],
	});

	const [comments, setComments] = useState('');

	const handleEditComments = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
		setComments(target.value);

	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dateSelected, setDateSelected] = useState(
		Utilities.formatDateString(new Date())
	);

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
		setAreChangesSaved(true);
		(async function () {
			const schedules = await Get.schedulesByDate(dateSelected);
			const homeRehabilitations = await Get.homeRehabilitationsByDate(
				dateSelected
			);
			setCurrentSchedule({ schedules, homeRehabilitations });
			setHomeRehabilitationsEdited([]);
		})();
	}, [dateSelected]);

	const [workStageSpans, setworkStageSpans] = useState<WorkStageSpans[]>([]);
	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
	}, []);

	const [areChangesSaved, setAreChangesSaved] = useState(true);

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
				if (areChangesSaved) setAreChangesSaved(false);
				updatedSchedule.schedules[stationName][cellNumber] = newCellValue;
			}
			return updatedSchedule;
		});
	};

	const saveScheudle = async () => {
		setAreChangesSaved(true);
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
						comments={comments}
						handleEditComments={handleEditComments}
					/>
				</main>

				{isUserAdmin && (
					<ActionPanel
						areChangesSaved={areChangesSaved}
						saveScheudle={saveScheudle}
					/>
				)}
			</div>
		</div>
	);
};
