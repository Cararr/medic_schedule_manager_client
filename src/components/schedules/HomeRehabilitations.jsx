import React from 'react';
import TableCell from './TableCell.jsx';
import { Utilities } from '../../util/util.js';
import './HomeRehabilitations.css';

export default function HomeRehabilitations(props) {
	const homeRehabilitationsView = props.homeRehabilitations
		.sort(sortByStartTime)
		.map((hR, index) => {
			const wasItEdited = props.homeRehabilitationsEdited.includes(hR.id);
			return (
				<tr key={hR.id}>
					<td>
						{props.isUserAdmin ? (
							<input
								onChange={(e) => props.handleHomeRehabilitationEdit(e, index)}
								name="startTime"
								className="input-home-rehabilitaiton"
								value={Utilities.formatTimeView(hR.startTime)}
								required
								type="time"
							></input>
						) : (
							Utilities.formatTimeView(hR.startTime)
						)}
					</td>
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
					<td>
						{props.isUserAdmin ? (
							<input
								onChange={(e) => props.handleHomeRehabilitationEdit(e, index)}
								name="patient"
								maxLength={250}
								className="input-home-rehabilitaiton"
								value={hR.patient}
								required
								type="text"
							></input>
						) : (
							hR.patient
						)}
					</td>
					{props.isUserAdmin && (
						<td style={{ backgroundColor: 'var(--backgroundYellow)' }}>
							{wasItEdited && (
								<i
									onClick={() => props.saveChangedHomeRehabilitation(hR)}
									style={{ marginRight: '1rem', fontSize: '1.2rem' }}
									className="icon-floppy"
								/>
							)}
							<i
								onClick={() => props.removeHomeRehabilitation(hR.id)}
								style={{ fontSize: '1.2rem' }}
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
						<td>Starts at</td>
						<td>Employee</td>
						<td>Patient</td>
					</tr>
				</thead>
				<tbody className="white-background">{homeRehabilitationsView}</tbody>
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
