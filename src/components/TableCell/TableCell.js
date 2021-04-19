import React from 'react';

import './TableCell.css';

export default function TableCell(props) {
	const drop = (e) => {
		e.preventDefault();
		// this is for swaping on drag
		const employee = e.dataTransfer.getData('employee');
		if (employee) {
			props.setDailyShift((prev) => {
				const updatedTable = prev[props.stationName];
				if (props.currentlyDragged || props.currentlyDragged === 0) {
					/* [
						updatedTable[props.currentlyDragged],
						updatedTable[props.cellNumber],
					] = [
						updatedTable[props.cellNumber],
						updatedTable[props.currentlyDragged],
					]; */
					updatedTable[props.currentlyDragged] = updatedTable[props.cellNumber];
					updatedTable[props.cellNumber] = employee;
					props.setCurrentlyDragged('');
					// alert(`lol :${updatedTable}`);
					console.log(updatedTable);
					alert(updatedTable);
					// console.log({ ...prev, [props.stationName]: updatedTable });
					return { ...prev, [props.stationName]: updatedTable };
				}
				updatedTable[props.cellNumber] = employee;
				return { ...prev, [props.stationName]: updatedTable };
			});
		}
	};
	const onDragOver = (e) => {
		e.preventDefault();
	};
	const onDragStart = (e) => {
		props.setCurrentlyDragged(props.cellNumber);
		const cellValue = props.dailyShift[props.cellNumber];
		e.dataTransfer.setData('employee', cellValue);
	};
	return (
		<td
			onClick={() => console.log(props.cellValue)}
			id={props.id}
			draggable={true}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDrop={drop}
			className={props.cellValue ? 'cell' : ''}
		>
			{props.cellValue}
		</td>
	);
}
