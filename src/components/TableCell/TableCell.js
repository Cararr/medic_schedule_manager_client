import React from 'react';
import './TableCell.css';

export default function TableCell(props) {
	const handleDrop = (e) => {
		e.preventDefault();
		const employee = JSON.parse(e.dataTransfer.getData('employee'));
		if (employee) {
			//swap logic
			if (props.currentlyDragged) {
				const [stationName, cellNumber] = extractStationAndNumberFromId(
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
			() =>
				props.editSchedule(props.cellNumber, props.stationName, {
					id: '',
					firstName: '',
					lastName: '',
				}),
			0
		);
	};

	return (
		<td
			id={props.id}
			onClick={() => console.log(props.cellValue)}
			draggable={props.cellValue.id && true}
			onDragLeave={handleOnDragLeave}
			onDragStart={handleOnDragStart}
			onDragOver={handleOnDragOver}
			onDrop={handleDrop}
			className={props.cellValue.id && 'cell'}
		>
			{`${props.cellValue.firstName} ${props.cellValue.lastName}`}
		</td>
	);
}

function removeDragOverClass({ target }) {
	target.className = target.className.replace(' cell-drag-over', '');
}

function extractStationAndNumberFromId(id) {
	return id.split('-');
}
