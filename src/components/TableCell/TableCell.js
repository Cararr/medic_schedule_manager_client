import React from 'react';

import './TableCell.css';

export default function TableCell(props) {
	const drop = (e) => {
		e.preventDefault();
		const employee = e.dataTransfer.getData('employee');
		if (employee) {
			if (props.currentlyDragged) {
				const cellCurrentlyDraged = document.getElementById(
					props.currentlyDragged
				);
				props.changeDailyShift(
					calulateCellNumberFromId(props.currentlyDragged),
					getStationNameFromId(props.currentlyDragged),
					e.target.innerText
				);
				cellCurrentlyDraged.innerText = e.target.innerText;
			}
			props.changeDailyShift(props.cellNumber, props.stationName, employee);
			e.target.innerText = employee;
			props.setCurrentlyDragged('');
		}
	};

	const onDragOver = (e) => {
		e.preventDefault();
	};
	const onDragStart = (e) => {
		props.setCurrentlyDragged(e.target.id);
		e.dataTransfer.setData('employee', e.target.innerText);
		setTimeout(() => (e.target.innerText = ''), 0);
	};
	return (
		<td
			onClick={() => console.log(props.cellNumber)}
			id={props.id}
			draggable={true}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDrop={drop}
			className="cell"
		>
			{props.cellValue}
		</td>
	);
}
function calulateCellNumberFromId(id) {
	const matches = id.match(/\d/g);
	return Number(matches[0]) * 4 + Number(matches[1]);
}
function getStationNameFromId(id) {
	return id.split('_')[0];
}
