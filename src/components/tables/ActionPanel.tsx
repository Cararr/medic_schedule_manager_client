import React, { ChangeEvent } from 'react';
import { DateForm } from '../../types';
import './ActionPanel.css';
import { CgSpinner } from 'react-icons/cg';

interface Props {
	generateSchedule?: () => Promise<void>;
	clearSchedule?: () => void;
	wasScheduleEdited?: boolean;
	saveScheudles?: () => Promise<void>;
	dateForm?: DateForm;
	setDateForm?: React.Dispatch<React.SetStateAction<DateForm>>;
	createSchedules?: (e: React.SyntheticEvent) => Promise<void>;
	printPlan?: () => void;
	isLoading?: boolean;
}

export const ActionPanel: React.FunctionComponent<Props> = (props) => {
	const handleDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (props.setDateForm)
			props.setDateForm((prev) => ({ ...prev, [target.name]: target.value }));
	};

	const createSchedulesView = Boolean(props.dateForm);
	const schedulesView = Boolean(props.saveScheudles);

	const loading = <CgSpinner className="spin" style={{ fontSize: '1.5rem' }} />;

	const dateForm = (
		<form
			onSubmit={props.createSchedules}
			className="form-create-schedules-date"
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
				<button
					style={{ marginTop: '.5rem' }}
					className="button-generic"
					type="submit"
				>
					Create
				</button>
			)}
		</form>
	);

	const statusBar = (
		<div className="action-panel-status">
			<h3>Status</h3>
			<p className="status-text">
				{props.wasScheduleEdited ? 'Unsaved changes!' : 'No changes to save'}
			</p>
			<div
				className="status-bar"
				style={{
					backgroundColor: props.wasScheduleEdited ? 'yellow' : 'green',
				}}
			></div>
		</div>
	);

	return (
		<aside className="action-panel">
			<h3>Actions</h3>
			<ul className="list">
				{createSchedulesView && (
					<li className="list-item">
						<button onClick={props.generateSchedule} className="button-generic">
							Generate
						</button>
					</li>
				)}
				{createSchedulesView && (
					<li className="list-item">
						<button onClick={props.clearSchedule} className="button-generic">
							Clear
						</button>
					</li>
				)}
				{schedulesView && (
					<li className="list-item">
						{props.isLoading ? (
							loading
						) : (
							<button
								disabled={!props.wasScheduleEdited}
								onClick={
									props.wasScheduleEdited ? props.saveScheudles : undefined
								}
								className={`button-generic ${
									!props.wasScheduleEdited && 'button-disabled'
								}`}
							>
								Save
							</button>
						)}
					</li>
				)}
				{schedulesView && (
					<li className="list-item">
						<button className="button-generic" onClick={props.printPlan}>
							Print
						</button>
					</li>
				)}
			</ul>
			{createSchedulesView && dateForm}
			{schedulesView && statusBar}
		</aside>
	);
};
