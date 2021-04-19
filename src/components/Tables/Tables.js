import './Tables.css';
import React, { useState } from 'react';
import Table from '../Table/Table';
import Data from '../../util/fakeData';

export default function Tables() {
	const { Schedules } = Data;
	const [currentlyDragged, setCurrentlyDragged] = useState('');
	const [dailyShift, setDailyShift] = useState(Schedules['15.04.2021']);
	// console.log(dailyShift);
	return (
		<div>
			<Table
				dailyShift={dailyShift.KINEZA}
				setDailyShift={setDailyShift}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
				stationName="KINEZA"
			/>
			<Table
				dailyShift={dailyShift.FIZYKO}
				setDailyShift={setDailyShift}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
				stationName="FIZYKO"
			/>
			<Table
				dailyShift={dailyShift.MASAZ}
				setDailyShift={setDailyShift}
				currentlyDragged={currentlyDragged}
				setCurrentlyDragged={setCurrentlyDragged}
				stationName="MASAZ"
			/>
		</div>
	);
}
