import React from 'react';
import TableCell from '../TableCell/TableCell.jsx';
import './HomeRehabilitaitons.css';

export default function HomeRehabilitaitons(props) {
	const homeRehabilitaitonsView = props.homeRehabilitations
		.sort(sortByStartTime)
		.map((hR, index) => (
			<tr key={hR.id} className="white-background">
				<td>{hR.startTime.slice(0, 5)}</td>
				<TableCell
					stationName={'homeRehabilitations'}
					editSchedule={editSchedule}
					id={`homeRehabilitations-${index}`}
					cellValue={hR.employee}
					cellNumber={index}
					currentlyDragged={currentlyDragged}
					setCurrentlyDragged={setCurrentlyDragged}
					key={index}
				>{`${hR.employee.firstName} ${hR.employee.lastName}`}</TableCell>
				<td>{hR.patient}</td>
			</tr>
		));
	// przekaz w propsie do homerehabilitations te rzeczy
	return (
		<table className="station-table">
			<thead>
				<tr className="table-title">
					<td colSpan={3}>HOME REHABILITATIONS</td>
				</tr>
				<tr>
					<td>Start at</td>
					<td>Employee</td>
					<td>Patient</td>
				</tr>
			</thead>
			<tbody>{homeRehabilitaitonsView}</tbody>
		</table>
	);
}

function sortByStartTime(a, b) {
	if (a.startTime < b.startTime) {
		return -1;
	}
	if (a.startTime > b.startTime) {
		return 1;
	}
	return 0;
}
