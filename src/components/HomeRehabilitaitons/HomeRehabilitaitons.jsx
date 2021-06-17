import React from 'react';
import TableCell from '../TableCell/TableCell.jsx';
import './HomeRehabilitaitons.css';

export default function HomeRehabilitaitons(props) {
	const homeRehabilitaitonsView = props.homeRehabilitations
		.sort(sortByStartTime)
		.map((hR, index) => {
			const wasItEdited = props.homeRehabilitationsEdited.includes(index);
			return (
				<tr key={hR.id} className="white-background">
					<td>{hR.startTime.slice(0, 5)}</td>
					<TableCell
						stationName={'homeRehabilitations'}
						editSchedule={props.editSchedule}
						id={`homeRehabilitations-${index}`}
						cellValue={hR.employee}
						cellNumber={index}
						currentlyDragged={props.currentlyDragged}
						setCurrentlyDragged={props.setCurrentlyDragged}
						key={index}
					/>
					<td>{hR.patient}</td>
					{props.isUserAdmin && (
						<td style={{ backgroundColor: '#eaf3c8' }}>
							{wasItEdited && (
								<i style={{ marginRight: '1rem' }} className="icon-floppy" />
							)}
							<i
								onClick={() => props.removeHomeRehabilitation(hR.id)}
								className="icon-trash-empty"
							/>
						</td>
					)}
				</tr>
			);
		});

	return (
		<section className="section-home-rehabilitations">
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
		</section>
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
