import React, { ChangeEvent } from 'react';
import { TableCell } from '../tables/TableCell';
import Utilities from '../../util/Utilities';
import './HomeRehabilitationsView.css';
import { HomeRehabilitation, Employee } from '../../types';

interface Props {
	isUserAdmin: boolean;
	editSchedule: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void;
	currentlyDragged: string;
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
	homeRehabilitations: HomeRehabilitation[];
	handleHomeRehabilitationEdit: (
		{ target }: ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
	homeRehabilitationsEdited: number[];
	removeHomeRehabilitation: (
		homeRehabilitation: HomeRehabilitation
	) => Promise<void>;
	saveHomeRehabilitationChanges: (
		homeRehabilitation: HomeRehabilitation
	) => Promise<void>;
}

export const HomeRehabilitations: React.FunctionComponent<Props> = (props) => {
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
									onClick={() => props.saveHomeRehabilitationChanges(hR)}
									style={{ marginRight: '1rem', fontSize: '1.2rem' }}
									className="icon-floppy"
								/>
							)}
							<i
								onClick={() => props.removeHomeRehabilitation(hR)}
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
			<table className="table-station">
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
};

function sortByStartTime(a: HomeRehabilitation, b: HomeRehabilitation) {
	if (a.startTime < b.startTime) {
		return -1;
	}
	if (a.startTime > b.startTime) {
		return 1;
	}
	return 0;
}
