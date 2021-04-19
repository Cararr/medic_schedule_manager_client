import './Tables.css';
import React, { useState } from 'react';
import Table from '../Table/Table';
import Data from '../../util/fakeData';

export default function Tables() {
	const { Schedules } = Data;
	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dailyShift, setDailyShift] = useState(Schedules['15.04.2021']);
	console.log(dailyShift);
	const changeDailyShift = (cellNumber, stationName, newCellValue) => {
		setDailyShift((prev) => {
			const updatedTableValues = prev[stationName];
			updatedTableValues[cellNumber] = newCellValue;
			return { ...prev, [stationName]: updatedTableValues };
		});
	};
	return (
		<div>
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
