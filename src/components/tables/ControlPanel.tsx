import React, { ChangeEvent } from 'react';
import { DateForm } from 'types';
import { CgSpinner } from 'react-icons/cg';
import styles from './tables.module.scss';

interface Props {
	generateSchedule?: () => Promise<void>;
	clearSchedule?: () => void;
	wasScheduleEdited?: boolean;
	saveScheudles?: () => Promise<void>;
	dateForm?: DateForm;
	setDateForm?: React.Dispatch<React.SetStateAction<DateForm>>;
	createSchedules?: (e: React.SyntheticEvent) => Promise<void>;
	printSchedules?: () => void;
	isLoading?: boolean;
}

export const ControlPanel: React.FunctionComponent<Props> = (props) => {
	const createSchedulesView = Boolean(props.dateForm);
	const schedulesView = Boolean(props.saveScheudles);

	const loading = <CgSpinner className="spin" style={{ fontSize: '1.5rem' }} />;

	const schedulesViewActions = [
		<li key={1} className="list-item">
			{props.isLoading ? (
				loading
			) : (
				<button
					disabled={!props.wasScheduleEdited}
					onClick={props.wasScheduleEdited ? props.saveScheudles : undefined}
					className={`button ${
						!props.wasScheduleEdited ? 'button-disabled' : ''
					}`}
				>
					Save
				</button>
			)}
		</li>,
		<li key={2} className="list-item">
			<button className="button" onClick={props.printSchedules}>
				Print
			</button>
		</li>,
		<li key={3} className="list-item">
			<h3>Status</h3>
			<p className={styles.status}>
				{props.wasScheduleEdited ? 'Unsaved changes!' : 'No changes to save'}
			</p>
			<div
				className={styles.bar}
				style={{
					backgroundColor: props.wasScheduleEdited ? 'yellow' : 'green',
				}}
			></div>
		</li>,
	];

	const handleDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (props.setDateForm)
			props.setDateForm((prev) => ({ ...prev, [target.name]: target.value }));
	};

	const createSchedulesViewActions = [
		<li key={1} className="list-item">
			<button onClick={props.generateSchedule} className="button">
				Generate
			</button>
		</li>,
		<li key={2} className="list-item">
			<button onClick={props.clearSchedule} className="button">
				Clear
			</button>
		</li>,
		<form
			key={3}
			onSubmit={props.createSchedules}
			className={`${styles.date} list-item`}
		>
			<label>From</label>
			<input
				required
				type="date"
				name="from"
				min="2020-01-01"
				max="2050-12-31"
				value={props.dateForm?.from}
				onChange={handleDateChange}
			/>
			<label>To</label>
			<input
				required
				type="date"
				name="to"
				max="2050-12-31"
				value={props.dateForm?.to}
				onChange={handleDateChange}
			/>
			{props.isLoading ? (
				loading
			) : (
				<button style={{ marginTop: '.5rem' }} className="button" type="submit">
					Create
				</button>
			)}
		</form>,
	];

	return (
		<aside className={styles.controlPanel}>
			<h3>Actions</h3>
			<ul className="list">
				{schedulesView && schedulesViewActions}
				{createSchedulesView && createSchedulesViewActions}
			</ul>
		</aside>
	);
};
