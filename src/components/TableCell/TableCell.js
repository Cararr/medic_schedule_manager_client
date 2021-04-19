import React from 'react';

import './TableCell.css';

export default function TableCell(props) {
	const drop = (e) => {
		e.preventDefault();
		// this is for swaping on drag
		const employee = e.dataTransfer.getData('employee');
		if (employee) {
			if (props.currentlyDragged) {
				document.getElementById(props.currentlyDragged).innerText =
					e.target.innerText;
				e.target.innerText = employee;
			}
			e.target.innerText = employee;
		}
	};

	const onDragOver = (e) => {
		e.preventDefault();
	};
	const onDragStart = (e) => {
		props.setCurrentlyDragged(e.target.id);
		e.dataTransfer.setData('employee', e.target.innerText);
	};
	return (
		<td
			onClick={() => console.log(props.cellValue)}
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
