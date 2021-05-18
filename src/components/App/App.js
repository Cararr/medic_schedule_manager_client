import React, { useState, useEffect } from 'react';
import { loadWorkStageSpans, loadScheduleByDate } from '../../util/fetchFromDB';
import { postSchedule } from '../../util/postToDB';
import { EmployeesProvider } from '../../context/employeesContext';
import Employees from '../Employees/Employees';
import Tables from '../Tables/Tables';
import TablesActionPanel from '../TablesActionPanel/TablesActionPanel';
import { Utilities } from '../../util/util';
import './App.css';

function App() {
	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dateSelected, setDateSelected] = useState(
		Utilities.formatDateString(new Date())
	);

	const [selectedSchedule, setSelectedSchedule] = useState(
		returnEmptyDailyShiftObject()
	);
	useEffect(() => {
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

	const editSchedule = (cellNumber, stationName, newCellValue) => {
		setSelectedSchedule((prev) => {
			const updatedTableValues = prev[stationName];
			updatedTableValues[Number(cellNumber)] = newCellValue;
			return { ...prev, [stationName]: updatedTableValues };
		});
	};

	const saveScheudle = async () => {
		await postSchedule(dateSelected, selectedSchedule);
	};
	return (
		<EmployeesProvider>
			<div className="App">
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
				<TablesActionPanel saveScheudle={saveScheudle} />
			</div>
		</EmployeesProvider>
	);
}

export default App;

function returnEmptyDailyShiftObject() {
	return {
		KINEZA: new Array(12).fill(null),
		FIZYKO: new Array(10).fill(null),
		MASAZ: new Array(4).fill(null),
		WIZYTY: new Array(1).fill(null),
	};
}
