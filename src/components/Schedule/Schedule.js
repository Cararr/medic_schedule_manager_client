import React, { useState, useEffect } from 'react';
import {
	loadWorkStageSpans,
	loadScheduleByDate,
	generateSchedule,
} from '../../util/fetchFromDB';
import { postSchedule } from '../../util/postToDB';
import Employees from '../Employees/Employees';
import Tables from '../Tables/Tables';
import TablesActionPanel from '../TablesActionPanel/TablesActionPanel';
import { Utilities } from '../../util/util';
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
		loadScheduleByDate(dateSelected)
			.then((schedule) => {
				if (schedule) setSelectedSchedule(schedule[dateSelected]);
			})
			.catch((error) => console.error(error));
	}, [dateSelected]);

	const [workStageSpans, setworkStageSpans] = useState([]);
	useEffect(() => {
		loadWorkStageSpans()
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
		await postSchedule(dateSelected, selectedSchedule);
	};

	const autoGenerateSchedule = async () => {
		generateSchedule().then((schedule) => {
			setIsChangesSaved(false);
			setSelectedSchedule(schedule);
		});
	};

	const clearSchedule = () => {
		setIsChangesSaved(false);
		setSelectedSchedule(returnEmptyDailyShiftObject());
	};

	return (
		<div className="schedule">
			<Employees />
			<Tables
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
				dateSelected={dateSelected}
				setDateSelected={setDateSelected}
				selectedSchedule={selectedSchedule}
				editSchedule={editSchedule}
				workStageSpans={workStageSpans}
			/>
			<TablesActionPanel
				isChangesSaved={isChangesSaved}
				saveScheudle={saveScheudle}
				autoGenerateSchedule={autoGenerateSchedule}
				clearSchedule={clearSchedule}
			/>
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
