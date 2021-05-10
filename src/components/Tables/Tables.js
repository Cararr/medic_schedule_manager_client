import './Tables.css';
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import SelectDate from '../SelectDate/SelectDate';
import { loadWorkStageSpans } from '../../util/fetchFromDB';

export default function Tables() {
	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dateSelected, setDateSelected] = useState(
		formatDateString(new Date())
	);
	const [selectedSchedule, setSelectedSchedule] = useState(
		returnEmptyDailyShiftObject()
	);

	const [workStageSpans, setworkStageSpans] = useState([]);
	useEffect(() => {
		loadWorkStageSpans()
			.then((stages) => setworkStageSpans(stages))
			.catch((error) => console.error(setworkStageSpans));
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
		KINEZA: new Array(10).fill({ id: '', first_name: '', last_name: '' }),
		FIZYKO: new Array(8).fill({ id: '', first_name: '', last_name: '' }),
		MASAZ: new Array(4).fill({ id: '', first_name: '', last_name: '' }),
	};
}
