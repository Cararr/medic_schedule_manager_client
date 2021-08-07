import React, { useState, useEffect } from 'react';
import Get from '../../api/Get';
import Post from '../../api/Post';
import { EmployeesList } from '../schedulesView/EmployeesList';
import { Tables } from '../tables/Tables';
import { ActionPanel } from '../tables/ActionPanel';
import Utilities from '../../util/Utilities';
import { useUser } from '../../context/userContext';
import {
	Employee,
	WorkStageSpans,
	StationSchedules,
	DateForm,
} from '../../types';
import './CreateSchedules.css';
import { createdMessage, warningMessage } from '../../WinBox/winboxMessages';

export const CreateSchedules: React.FunctionComponent = () => {
	const [dateForm, setDateForm] = useState<DateForm>({
		from: Utilities.formatDateString(new Date()),
		to: Utilities.formatDateString(Utilities.incrementDateByDay(new Date())),
	});
	//zmiana currenta
	const [isLoading, setIsLoading] = useState(false);

	const [schedules, setschedules] = useState<StationSchedules>(
		Utilities.returnEmptyDailyShift()
	);
	const editSchedule = (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => {
		setschedules((prev) => {
			const updatedSchedule = { ...prev };
			updatedSchedule[stationName][cellNumber] = newCellValue;
			return updatedSchedule;
		});
	};
	const autoGenerateSchedule = async () => {
		Get.generateSchedule(dateForm.from).then((schedules) => {
			setschedules((prev) => (schedules ? { ...prev, schedules } : prev));
		});
	};
	const clearSchedule = () => {
		setschedules(Utilities.returnEmptyDailyShift());
	};
	const createSchedules = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!Utilities.checkIfEndDateIsAfterBegin(dateForm.from, dateForm.to))
			warningMessage(
				'Wrong date set!',
				'End date cannot come before the beginning!',
				170
			);

		setIsLoading(true);
		const response = await Post.schedules({
			from: dateForm.from,
			to: dateForm.to,
			schedules: schedules,
		});
		setIsLoading(false);

		response?.ok
			? createdMessage()
			: warningMessage(
					'Error',
					'Action aborted, something went wrong. Sorry!',
					170
			  );
	};
	const [currentlyDragged, setCurrentlyDragged] = useState('');

	const [workStageSpans, setworkStageSpans] = useState<WorkStageSpans[]>([]);
	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
	}, []);

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<div>
			<div className="schedules">
				{isUserAdmin && <EmployeesList schedules={schedules} />}
				<main className="section-schedules-central">
					<Tables
						currentlyDragged={currentlyDragged}
						setCurrentlyDragged={setCurrentlyDragged}
						schedules={schedules}
						editSchedule={editSchedule}
						workStageSpans={workStageSpans}
					/>
				</main>
				{
					<ActionPanel
						autoGenerateSchedule={autoGenerateSchedule}
						clearSchedule={clearSchedule}
						dateForm={dateForm}
						setDateForm={setDateForm}
						createSchedules={createSchedules}
						isLoading={isLoading}
					/>
				}
			</div>
		</div>
	);
};
