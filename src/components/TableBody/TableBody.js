import TableRow from '../TableRow/TableRow';
import React from 'react';

import './TableBody.css';

export default function TableBody(props) {
	let rows;
	switch (props.stationName) {
		case 'KINEZA':
			rows = [
				<TableRow
					changeDailyShift={props.changeDailyShift}
					dailyShift={props.dailyShift}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					howManyCells={4}
					stationName={props.stationName}
					row="KINEZA_0st_row"
					key="KINEZA_0st_row"
				/>,
				<TableRow
					changeDailyShift={props.changeDailyShift}
					dailyShift={props.dailyShift}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					howManyCells={4}
					stationName={props.stationName}
					row="KINEZA_1nd_row"
					key="KINEZA_1nd_row"
				/>,
				<TableRow
					changeDailyShift={props.changeDailyShift}
					dailyShift={props.dailyShift}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					howManyCells={2}
					stationName={props.stationName}
					row="KINEZA_2rd_row"
					key="KINEZA_2rd_row"
				/>,
			];
			break;
		case 'FIZYKO':
			rows = [
				<TableRow
					changeDailyShift={props.changeDailyShift}
					dailyShift={props.dailyShift}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					howManyCells={4}
					stationName={props.stationName}
					row="FIZYKO_0st_row"
					key="FIZYKO_0st_row"
				/>,
				<TableRow
					changeDailyShift={props.changeDailyShift}
					dailyShift={props.dailyShift}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					howManyCells={4}
					stationName={props.stationName}
					row="FIZYKO_1nd_row"
					key="FIZYKO_1nd_row"
				/>,
			];
			break;
		case 'MASAZ':
			rows = [
				<TableRow
					changeDailyShift={props.changeDailyShift}
					dailyShift={props.dailyShift}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					howManyCells={4}
					stationName={props.stationName}
					row="MASAZ_0st_row"
					key="MASAZ_0st_row"
				/>,
			];
			break;

		default:
			console.error('invalid staiton name');
			break;
	}
	return <tbody>{rows}</tbody>;
}
