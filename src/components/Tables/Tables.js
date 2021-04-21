import './Tables.css';
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import SelectDate from '../SelectDate/SelectDate';
import Data from '../../util/fakeData';

export default function Tables() {
	const { Schedules } = Data;
	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dateSelected, setDateSelected] = useState(
		formatDateString(new Date())
	);
	const [dailyShift, setDailyShift] = useState(returnEmptyDailyShiftObject());
	useEffect(() => {
		if (Schedules[dateSelected]) setDailyShift(Schedules[dateSelected]);
		else setDailyShift(returnEmptyDailyShiftObject());
	}, [dateSelected]);

	const changeDailyShift = (cellNumber, stationName, newCellValue) => {
		setDailyShift((prev) => {
			const updatedTableValues = prev[stationName];
			updatedTableValues[cellNumber] = newCellValue;
			return { ...prev, [stationName]: updatedTableValues };
		});
	};
	return (
		<div>
			<SelectDate
				setDateSelected={setDateSelected}
				dateSelected={dateSelected}
			/>
			<Table
				dailyShift={dailyShift.KINEZA}
				changeDailyShift={changeDailyShift}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
				stationName="KINEZA"
			/>
			<Table
				dailyShift={dailyShift.FIZYKO}
				changeDailyShift={changeDailyShift}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
				stationName="FIZYKO"
			/>
			<Table
				dailyShift={dailyShift.MASAZ}
				changeDailyShift={changeDailyShift}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
				stationName="MASAZ"
			/>
		</div>
	);
}
function formatDateString(date) {
	const dateArray = date.toLocaleDateString().split('.');
	return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}
function returnEmptyDailyShiftObject() {
	return {
		KINEZA: new Array(10).fill(''),
		FIZYKO: new Array(8).fill(''),
		MASAZ: new Array(4).fill(''),
	};
}
