import React, { ChangeEvent } from 'react';
import { TableCell } from 'components/tables/TableCell';
import Utilities from 'util/Utilities';
import { HomeRehabilitation, Employee, Comment } from 'types';
import { BsTrash } from 'react-icons/bs';
import styles from './tables.module.scss';

interface Props {
	isUserBoss: boolean;
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
						{props.isUserBoss ? (
							<input
								required
								type="time"
								name="startTime"
								value={Utilities.formatTimeView(hR.startTime)}
								onChange={(e) =>
									props.handleHomeRehabilitationChanges(e, index)
								}
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
						{props.isUserBoss ? (
							<input
								onChange={(e) =>
									props.handleHomeRehabilitationChanges(e, index)
								}
								required
								name="patient"
								maxLength={25}
								value={hR.patient}
							></input>
						) : (
							hR.patient
						)}
					</td>
					{props.isUserBoss && (
						<td className={`${styles.trash} not-printable`}>
							<BsTrash onClick={() => props.removeHomeRehabilitation(hR)} />
						</td>
					)}
				</tr>
			);
		});

	return (
		<section className={styles.homeRehabilitations}>
			<table className={styles.table}>
				<thead>
					<tr className={styles.tableTitle}>
						<td colSpan={3}>Rehabilitacje w domu pacjenta</td>
					</tr>
					<tr>
						<td>Starts at</td>
						<td>Employee</td>
						<td>Patient</td>
					</tr>
				</thead>
				<tbody className={styles.backgroundWhite}>
					{homeRehabilitationsView}
				</tbody>
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
