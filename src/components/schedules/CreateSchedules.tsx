import React, { useState, useEffect } from 'react';
import Get from 'api/Get';
import Post from 'api/Post';
import { EmployeesList } from 'components/schedules/EmployeesList';
import { Tables } from 'components/tables/Tables';
import { ControlPanel } from 'components/tables/ControlPanel';
import Utilities from 'util/Utilities';
import { useUser } from 'providers/UserContext';
import { Employee, WorkStageSpans, StationSchedules, DateForm } from 'types';
import {
	createdMessage,
	tipsWinbox,
	errorMessage,
} from 'WinBox/winboxMessages';
import globalStyles from 'globalStyles.module.scss';

export const CreateSchedules: React.FunctionComponent = () => {
	const [stationSchedules, setStationSchedules] = useState<StationSchedules>(
		Utilities.returnEmptyStationSchedules()
	);

	const [dateForm, setDateForm] = useState<DateForm>({
		from: Utilities.formatDateString(new Date()),
		to: Utilities.formatDateString(Utilities.addDay(new Date())),
	});

	const [workStageSpans, setworkStageSpans] = useState<WorkStageSpans[]>([]);

	const [currentlyDragged, setCurrentlyDragged] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const isUserBoss = Utilities.checkIfUserIsAdmin(useUser().user);

	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
		const Winbox = tipsWinbox();
		return () => Winbox.close();
	}, []);

	const changeCellValue = (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => {
		setStationSchedules((prev) => {
			const updatedSchedule = { ...prev };
			updatedSchedule[stationName][cellNumber] = newCellValue;
			return updatedSchedule;
		});
	};

	const generateSchedule = async () => {
		Get.generateSchedule().then((schedules) => {
			if (schedules) setStationSchedules(schedules);
		});
	};

	const clearSchedule = () => {
		setStationSchedules(Utilities.returnEmptyStationSchedules());
	};

	const createSchedules = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!Utilities.checkIfEndDateIsAfterBegin(dateForm.from, dateForm.to))
			return errorMessage(
				'Invalid date!',
				'End date cannot come before the beginning!',
				170,
				17
			);

		setIsLoading(true);
		const success = await Post.instance('schedules', {
			from: dateForm.from,
			to: dateForm.to,
			schedules: stationSchedules,
		});
		setIsLoading(false);

		success
			? createdMessage()
			: errorMessage(
					'Action aborted!',
					'Something went wrong, please try again later!',
					170
			  );
	};

	return (
		<div className={globalStyles.schedulesContainer}>
			{isUserBoss && <EmployeesList stationSchedules={stationSchedules} />}
			<main className={globalStyles.schedulesContent}>
				<Tables
					schedules={{
						stationSchedules,
						homeRehabilitations: [],
						comment: Utilities.returnEmptyComment(''),
					}}
					currentlyDragged={currentlyDragged}
					setCurrentlyDragged={setCurrentlyDragged}
					changeCellValue={changeCellValue}
					workStageSpans={workStageSpans}
				/>
			</main>
			{
				<ControlPanel
					generateSchedule={generateSchedule}
					clearSchedule={clearSchedule}
					dateForm={dateForm}
					setDateForm={setDateForm}
					createSchedules={createSchedules}
					isLoading={isLoading}
				/>
			}
		</div>
	);
};
