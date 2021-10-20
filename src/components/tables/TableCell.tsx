import React from 'react';
import { useUser } from '../../providers/UserContext';
import { Employee, HomeRehabilitation, Comment } from '../../types';
import Utilities from '../../util/Utilities';
import './TableCell.css';

interface Props {
	cellNumber: number;
	stationName: string;
	changeCellValue: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void;
	checkForSchedulesChanges?: (
		comment?: Comment,
		homeRehabilitations?: HomeRehabilitation[]
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
			//swap
			if (props.currentlyDragged) {
				const [stationName, cellNumber] = extractStationAndCellNumberFromId(
					props.currentlyDragged
				);
				props.changeCellValue(cellNumber, stationName, props.cellValue);
			}
			props.changeCellValue(props.cellNumber, props.stationName, employee);
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
		e.dataTransfer.setData('employee', JSON.stringify(props.cellValue));
		if (!e.ctrlKey) {
			props.setCurrentlyDragged(target.id);
			setTimeout(
				() => props.changeCellValue(props.cellNumber, props.stationName, null),
				0
			);
		}
	};

	const { user } = useUser();

	const isUserBoss = Utilities.checkIfUserIsAdmin(user);

	const className = `${
		user?.lastName === props.cellValue?.lastName
			? 'orange-background'
			: 'white-background'
	} ${props.cellValue && isUserBoss && 'draggable'}`;

	const isCellDraggable = Boolean(props.cellValue) && isUserBoss;

	return (
		<td
			id={`${props.stationName}-${props.cellNumber}`}
			className={className}
			draggable={isCellDraggable}
			onDragLeave={isUserBoss ? handleOnDragLeave : undefined}
			onDragStart={isUserBoss ? handleOnDragStart : undefined}
			onDragOver={isUserBoss ? handleOnDragOver : undefined}
			onDrop={isUserBoss ? handleDrop : undefined}
			onDragEnd={() =>
				props.checkForSchedulesChanges && props.checkForSchedulesChanges()
			}
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
