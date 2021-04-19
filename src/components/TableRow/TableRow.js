import React from 'react';
import TableCell from '../TableCell/TableCell';
import TableCellBlank from '../TableCellBlank/TableCellBlank';

export default function TableRow(props) {
	const cellsArray = [];
	let cellCounter = 0;
	for (let i = 0; i < 5; i++) {
		if (i === 0) cellsArray.push(<TableCellBlank key={i} />);
		else if (props.howManyCells === 2 && (i === 1 || i === 4))
			cellsArray.push(<TableCellBlank key={i} />);
		else {
			const cellNumber =
				extractRowNumberFromRowName(props.row) * 4 + cellCounter;
			cellsArray.push(
				<TableCell
					stationName={props.stationName}
					changeDailyShift={props.changeDailyShift}
					cellNumber={cellNumber}
					currentlyDragged={props.currentlyDragged}
					setCurrentlyDragged={props.setCurrentlyDragged}
					id={`${props.row}_${cellCounter}`}
					key={i}
				/>
			);
			cellCounter++;
		}
	}
	return <tr>{cellsArray}</tr>;
}
function extractRowNumberFromRowName(rowName) {
	return Number(rowName.match(/\d/g)[0]);
}
