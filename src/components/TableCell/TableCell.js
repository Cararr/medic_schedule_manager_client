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
			removeDragOverClass(e);
		}
	};

	const onDragOver = (e) => {
		e.preventDefault();
		if (!e.target.className.includes('cell_drag_over'))
			e.target.className += ' cell_drag_over';
	};
	const onDragLeave = (e) => {
		e.preventDefault();
		removeDragOverClass(e);
	};
	const onDragStart = (e) => {
		props.setCurrentlyDragged(e.target.id);
		e.dataTransfer.setData('employee', e.target.innerText);
		setTimeout(() => (e.target.innerText = ''), 0);
	};
	const onDragEnd = ({ target }) => {
		if (!target['innerText'])
			props.changeDailyShift(props.cellNumber, props.stationName, '');
	};
	return (
		<td
			id={props.id}
			draggable={props.cellValue && true}
			onDragEnd={onDragEnd}
			onDragLeave={onDragLeave}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDrop={drop}
			className={props.cellValue && 'cell'}
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
function removeDragOverClass({ target }) {
	target.className = target.className.replace(' cell_drag_over', '');
}
