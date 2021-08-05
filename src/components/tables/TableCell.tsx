import React from 'react';
import { useUser } from '../../context/userContext';
import { Employee } from '../../types';
import Utilities from '../../util/Utilities';
import './TableCell.css';

interface Props {
	cellNumber: number;
	stationName: string;
	editSchedule: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void;
	cellValue: Employee | null;
	currentlyDragged: string;
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
}

export const TableCell: React.FunctionComponent<Props> = (props) => {
	const handleDrop = (e: React.DragEvent<HTMLTableCellElement>) => {
		e.preventDefault();

		const dataTransferred = e.dataTransfer?.getData('employee');
		const employee = dataTransferred ? JSON.parse(dataTransferred) : null;
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

	const handleOnDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
		e.preventDefault();
		const target = e.target as HTMLTableCellElement;
		if (!target.className.includes('cell-drag-over'))
			target.className += ' cell-drag-over';
	};

	const handleOnDragLeave = (e: React.DragEvent<HTMLTableCellElement>) => {
		e.preventDefault();
		removeDragOverClass(e);
	};

	const handleOnDragStart = (e: React.DragEvent<HTMLTableCellElement>) => {
		const target = e.target as HTMLTableCellElement;
		props.setCurrentlyDragged(target.id);
		e.dataTransfer.setData('employee', JSON.stringify(props.cellValue));
		setTimeout(
			() => props.editSchedule(props.cellNumber, props.stationName, null),
			0
		);
	};

	const isUserAdmin = Utilities.checkIfUserIsAdmin(useUser());

	const className = `white-background ${
		props.cellValue && isUserAdmin && 'draggable'
	}`;

	const isCellDraggable = Boolean(props.cellValue) && isUserAdmin;

	return (
		<td
			id={`${props.stationName}-${props.cellNumber}`}
			draggable={isCellDraggable}
			onDragLeave={isUserAdmin ? handleOnDragLeave : undefined}
			onDragStart={isUserAdmin ? handleOnDragStart : undefined}
			onDragOver={isUserAdmin ? handleOnDragOver : undefined}
			onDrop={isUserAdmin ? handleDrop : undefined}
			onDragEnd={() => console.log(1)}
			className={className}
		>
			{props.cellValue &&
				`${props.cellValue.firstName} ${props.cellValue.lastName}`}
		</td>
	);
};

function removeDragOverClass({
	target,
}: React.DragEvent<HTMLTableCellElement>) {
	(target as HTMLTableCellElement).className = (
		target as HTMLTableCellElement
	).className.replace(' cell-drag-over', '');
}

function extractStationAndCellNumberFromId(id: string): [string, number] {
	const cellProps = id.split('-');
	return [cellProps[0], Number(cellProps[1])];
}
