import React, { useState, useEffect } from 'react';
import Get from '../../util/api/Get';
import Post from '../../util/api/Post';
import { EmployeesList } from '../schedules/EmployeesList';
import { Tables } from '../schedules/Tables';
import { SchedulesActionPanel } from '../schedules/SchedulesActionPanel';
import Utilities from '../../util/Utilities';
import { useUser } from '../../context/userContext';
import {
	Employee,
	WorkStageSpans,
	CompleteSchedule,
	DateForm,
} from '../../types';
import './CreateSchedules.css';

export const CreateSchedules: React.FunctionComponent = () => {
	const [currentlyDragged, setCurrentlyDragged] = useState('');

	const [dateForm, setDateForm] = useState<DateForm>({
		from: Utilities.formatDateString(new Date()),
		to: Utilities.formatDateString(Utilities.incrementDateByDay(new Date())),
	});

	const [currentSchedule, setCurrentSchedule] = useState<CompleteSchedule>({
		schedules: Utilities.returnEmptyDailyShiftObject(),
		homeRehabilitations: [],
	});

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
			updatedSchedule.schedules[stationName][cellNumber] = newCellValue;
			return updatedSchedule;
		});
	};

	const autoGenerateSchedule = async () => {
		Get.generateSchedule().then((schedules) => {
			setCurrentSchedule((prev) => (schedules ? { ...prev, schedules } : prev));
		});
	};

	const clearSchedule = () => {
		setCurrentSchedule((prev) => ({
			...prev,
			schedules: Utilities.returnEmptyDailyShiftObject(),
		}));
	};

	const createSchedules = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const response = await Post.schedules({
			from: dateForm.from,
			to: dateForm.to,
			schedules: currentSchedule.schedules,
		});
		console.log(response);
	};

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	return (
		<div>
			<div className="schedules">
				{isUserAdmin && <EmployeesList />}
				<main className="section-schedules-central">
					<Tables
						currentlyDragged={currentlyDragged}
						setCurrentlyDragged={setCurrentlyDragged}
						currentSchedule={currentSchedule}
						editSchedule={editSchedule}
						workStageSpans={workStageSpans}
					/>
				</main>
				{
					<SchedulesActionPanel
						autoGenerateSchedule={autoGenerateSchedule}
						clearSchedule={clearSchedule}
						dateForm={dateForm}
						setDateForm={setDateForm}
						createSchedules={createSchedules}
					/>
				}
			</div>
		</div>
	);
};
