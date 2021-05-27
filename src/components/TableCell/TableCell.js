import React from 'react';
import './TableCell.css';

export default function TableCell(props) {
	const handleDrop = (e) => {
		e.preventDefault();
		const employee = JSON.parse(e.dataTransfer.getData('employee'));
		if (employee) {
			//swap logic
			if (props.currentlyDragged) {
				const [stationName, cellNumber] = extractStationAndCellNumberFromId(
					props.currentlyDragged
				);
				props.editSchedule(cellNumber, stationName, props.cellValue);
			}
			props.editSchedule(props.cellNumber, props.stationName, employee);
			props.setCurrentlyDragged('');
			removeDragOverClass(e);
		}
	};

	const handleOnDragOver = (e) => {
		e.preventDefault();
		if (!e.target.className.includes('cell-drag-over'))
			e.target.className += ' cell-drag-over';
	};

	const handleOnDragLeave = (e) => {
		e.preventDefault();
		removeDragOverClass(e);
	};

	const handleOnDragStart = (e) => {
		props.setCurrentlyDragged(e.target.id);
		e.dataTransfer.setData('employee', JSON.stringify(props.cellValue));
		setTimeout(
			() => props.editSchedule(props.cellNumber, props.stationName, null),
			0
		);
	};

	const className = `white-background ${props.cellValue && 'cell'}`;

	return (
		<td
			id={props.id}
			// onDragEnd={() => console.log(666)}
			draggable={props.cellValue && true}
			onDragLeave={handleOnDragLeave}
			onDragStart={handleOnDragStart}
			onDragOver={handleOnDragOver}
			onDrop={handleDrop}
			className={className}
		>
			{props.cellValue &&
				`${props.cellValue.firstName} ${props.cellValue.lastName}`}
		</td>
	);
}

function removeDragOverClass({ target }) {
	target.className = target.className.replace(' cell-drag-over', '');
}

function extractStationAndCellNumberFromId(id) {
	return id.split('-');
}
