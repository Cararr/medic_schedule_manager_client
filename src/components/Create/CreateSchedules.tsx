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
import { createdMessage, warningMessage } from '../../WinBox/winboxMessages';

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

	useEffect(() => {
		Get.workStageSpans().then((stages) => setworkStageSpans(stages));
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
		Get.generateSchedule(dateForm.from).then((schedules) => {
			if (schedules) setStationSchedules(schedules);
		});
	};

	const clearSchedule = () => {
		setStationSchedules(Utilities.returnEmptyStationSchedules());
	};

	const createSchedules = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!Utilities.checkIfEndDateIsAfterBegin(dateForm.from, dateForm.to))
			return warningMessage(
				'Invalid date!',
				'End date cannot come before the beginning!',
				170
			);

		setIsLoading(true);
		const response = await Post.schedules({
			from: dateForm.from,
			to: dateForm.to,
			schedules: stationSchedules,
		});
		setIsLoading(false);

		response?.ok
			? createdMessage()
			: warningMessage(
					'Action aborted!',
					'Something went wrong, please try again later!',
					170
			  );
	};

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<div>
			<div className="container-schedules">
				{isUserAdmin && <EmployeesList stationSchedules={stationSchedules} />}
				<main className="main-schedules">
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
					<ActionPanel
						generateSchedule={generateSchedule}
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
