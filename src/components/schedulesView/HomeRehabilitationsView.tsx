import React, { ChangeEvent } from 'react';
import { TableCell } from '../tables/TableCell';
import Utilities from '../../util/Utilities';
import { HomeRehabilitation, Employee, Comment } from '../../types';
import './HomeRehabilitationsView.css';
import { BsTrash } from 'react-icons/bs';

interface Props {
	isUserAdmin: boolean;
	changeCellValue: (
		cellNumber: number,
		stationName: string,
		newCellValue: Employee | null
	) => void;
	checkForSchedulesChanges?: (
		comment?: Comment,
		homeRehabilitations?: HomeRehabilitation[]
	) => void;
	currentlyDragged: string;
	setCurrentlyDragged: React.Dispatch<React.SetStateAction<string>>;
	homeRehabilitations: HomeRehabilitation[];
	handleHomeRehabilitationChanges: (
		{ target }: ChangeEvent<HTMLInputElement>,
		index: number
	) => void;
	removeHomeRehabilitation: (
		homeRehabilitation: HomeRehabilitation
	) => Promise<void>;
}

export const HomeRehabilitations: React.FunctionComponent<Props> = (props) => {
	const homeRehabilitationsView = props.homeRehabilitations
		.sort(sortByStartTime)
		.map((hR, index) => {
			return (
				<tr key={hR.id}>
					<td>
						{props.isUserAdmin ? (
							<input
								onChange={(e) =>
									props.handleHomeRehabilitationChanges(e, index)
								}
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
						key={index}
						stationName={'homeRehabilitations'}
						changeCellValue={props.changeCellValue}
						checkForSchedulesChanges={props.checkForSchedulesChanges}
						cellValue={hR.employee}
						cellNumber={index}
						currentlyDragged={props.currentlyDragged}
						setCurrentlyDragged={props.setCurrentlyDragged}
					/>
					<td style={{ width: '14rem' }}>
						{props.isUserAdmin ? (
							<input
								onChange={(e) =>
									props.handleHomeRehabilitationChanges(e, index)
								}
								name="patient"
								maxLength={30}
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
						<td
							style={{
								backgroundColor: 'var(--backgroundYellow)',
								width: '2rem',
							}}
						>
							<BsTrash
								onClick={() => props.removeHomeRehabilitation(hR)}
								style={{
									fontSize: '1.2rem',
									color: 'var(--red)',
									cursor: 'pointer',
								}}
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
						<td colSpan={3}>Rehabilitacje w domu pacjenta</td>
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
