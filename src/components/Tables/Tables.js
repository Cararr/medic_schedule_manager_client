import './Tables.css';
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import SelectDate from '../SelectDate/SelectDate';
import { loadWorkStageSpans, loadScheduleByDate } from '../../util/fetchFromDB';

export default function Tables() {
	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dateSelected, setDateSelected] = useState(
		formatDateString(new Date())
	);

	const [selectedSchedule, setSelectedSchedule] = useState(
		returnEmptyDailyShiftObject()
	);
	useEffect(() => {
		loadScheduleByDate(dateSelected)
			.then((schedule) => setSelectedSchedule(schedule[dateSelected]))
			.catch((error) => console.error(error));
	}, [dateSelected]);

	const [workStageSpans, setworkStageSpans] = useState([]);
	useEffect(() => {
		loadWorkStageSpans()
			.then((stages) => setworkStageSpans(stages))
			.catch((error) => console.error(error));
	}, []);

	const editSchedule = (cellNumber, stationName, newCellValue) => {
		setSelectedSchedule((prev) => {
			const updatedTableValues = prev[stationName];
			updatedTableValues[Number(cellNumber)] = newCellValue;
			return { ...prev, [stationName]: updatedTableValues };
		});
	};

	const tables = [];
	for (const station in selectedSchedule) {
		tables.push(
			<Table
				selectedSchedule={selectedSchedule[station]}
				editSchedule={editSchedule}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
				stationName={station}
				key={station}
				workStageSpans={workStageSpans}
			/>
		);
	}

	return (
		<div className="tables-section">
			<SelectDate
				setDateSelected={setDateSelected}
				dateSelected={dateSelected}
				formatDateString={formatDateString}
			/>
			{(tables.length && tables) || 'Loading...'}
		</div>
	);
}
function formatDateString(date) {
	const dateArray = date.toLocaleDateString().split('.');
	const day = Number(dateArray[0]) < 10 ? `0${dateArray[0]}` : dateArray[0];
	return `${dateArray[2]}-${dateArray[1]}-${day}`;
}
function returnEmptyDailyShiftObject() {
	return {
		KINEZA: new Array(12).fill(null),
		FIZYKO: new Array(10).fill(null),
		MASAZ: new Array(4).fill(null),
		WIZYTY: new Array(1).fill(null),
	};
}
