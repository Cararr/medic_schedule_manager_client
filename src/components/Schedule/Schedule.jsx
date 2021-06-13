import React, { useState, useEffect } from 'react';
import {
	getWorkStageSpans,
	getScheduleByDate,
	generateSchedule,
} from '../../util/fetchFromDB';
import { putSchedule } from '../../util/postToDB';
import EmployeesList from '../EmployeesList/EmployeesList.jsx';
import Tables from '../Tables/Tables.jsx';
import TablesActionPanel from '../TablesActionPanel/TablesActionPanel.jsx';
import HomeRehabilitaitons from '../HomeRehabilitaitons/HomeRehabilitaitons.jsx';
import { Utilities } from '../../util/util';
import NavBar from '../NavBar/NavBar.jsx';
import { useUser } from '../../context/userContext';
import './Schedule.css';

export default function Schedule() {
	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dateSelected, setDateSelected] = useState(
		Utilities.formatDateString(new Date())
	);

	const [selectedSchedule, setSelectedSchedule] = useState(
		returnEmptyDailyShiftObject()
	);
	useEffect(() => {
		setIsChangesSaved(true);
		getScheduleByDate(dateSelected)
			.then((schedule) => {
				if (schedule) setSelectedSchedule(schedule[dateSelected]);
			})
			.catch((error) => console.error(error));
	}, [dateSelected]);

	const [workStageSpans, setworkStageSpans] = useState([]);
	useEffect(() => {
		getWorkStageSpans()
			.then((stages) => setworkStageSpans(stages))
			.catch((error) => console.error(error));
	}, []);

	const [isChangesSaved, setIsChangesSaved] = useState(true);
	const editSchedule = (cellNumber, stationName, newCellValue) => {
		if (isChangesSaved) setIsChangesSaved(false);
		setSelectedSchedule((prev) => {
			const updatedStationTable = [...prev[stationName]];
			updatedStationTable[Number(cellNumber)] = newCellValue;
			return { ...prev, [stationName]: updatedStationTable };
		});
	};

	const saveScheudle = async () => {
		setIsChangesSaved(true);
		await putSchedule(dateSelected, selectedSchedule);
	};

	const autoGenerateSchedule = async () => {
		generateSchedule().then((schedule) => {
			setIsChangesSaved(false);
			setSelectedSchedule(schedule || returnEmptyDailyShiftObject());
		});
	};

	const clearSchedule = () => {
		setIsChangesSaved(false);
		setSelectedSchedule(returnEmptyDailyShiftObject());
	};

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());
	return (
		<div>
			<NavBar />
			<div className="schedule">
				{isUserAdmin && <EmployeesList />}
				<Tables
					currentlyDragged={currentlyDragged}
					setCurrentlyDragged={setCurrentlyDragged}
					dateSelected={dateSelected}
					setDateSelected={setDateSelected}
					selectedSchedule={selectedSchedule}
					editSchedule={editSchedule}
					workStageSpans={workStageSpans}
				/>
				{isUserAdmin && (
					<TablesActionPanel
						isChangesSaved={isChangesSaved}
						saveScheudle={saveScheudle}
						autoGenerateSchedule={autoGenerateSchedule}
						clearSchedule={clearSchedule}
					/>
				)}
			</div>
			<HomeRehabilitaitons />
		</div>
	);
}

function returnEmptyDailyShiftObject() {
	return {
		KINEZA: new Array(12).fill(null),
		FIZYKO: new Array(10).fill(null),
		MASAZ: new Array(4).fill(null),
		WIZYTY: new Array(1).fill(null),
	};
}
