import React, { ChangeEvent } from 'react';
import { DateForm } from '../../types';
import './SchedulesActionPanel.css';

interface Props {
	autoGenerateSchedule: () => Promise<void>;
	clearSchedule: () => void;
	areChangesSaved?: boolean;
	saveScheudle?: () => Promise<void>;
	dateForm?: DateForm;
	setDateForm?: React.Dispatch<React.SetStateAction<DateForm>>;
	createSchedules?: (e: React.SyntheticEvent) => Promise<void>;
}

export const SchedulesActionPanel: React.FunctionComponent<Props> = (props) => {
	const handleDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (props.setDateForm)
			props.setDateForm((prev) => ({ ...prev, [target.name]: target.value }));
	};
	// MOŻE JAKIEŚ ŁADOWANIE PO CREATE ?
	const dateForm = props.dateForm ? (
		<form onSubmit={props.createSchedules} className="form-date">
			<label>From</label>
			<input
				required
				onChange={handleDateChange}
				type="date"
				name="from"
				value={props.dateForm?.from}
			/>
			<label>To</label>
			<input
				required
				onChange={handleDateChange}
				type="date"
				name="to"
				value={props.dateForm?.to}
			/>
			<button className="button-generic" type="submit">
				Create
			</button>
		</form>
	) : undefined;
	const statusColor = props.areChangesSaved ? 'green' : 'yellow';
	const statusText = props.areChangesSaved
		? 'No changes to save'
		: 'Unsaved changes!';

	return (
		<aside className="action-panel">
			<h3>Actions</h3>
			<ul className="list">
				<li>
					<button
						onClick={props.autoGenerateSchedule}
						className="list-item button-generic"
					>
						Generate
					</button>
				</li>
				<li>
					<button
						onClick={props.clearSchedule}
						className="list-item button-generic"
					>
						Clear
					</button>
				</li>
				{props.saveScheudle && (
					<li>
						<button
							onClick={props.saveScheudle}
							className="list-item button-generic"
						>
							Save
						</button>
					</li>
				)}
				{dateForm}
			</ul>
			{props.saveScheudle && (
				<div className="action-panel-status">
					<h3>Status</h3>
					<p className="status-text">{statusText}</p>
					<div
						className="status-bar"
						style={{ backgroundColor: statusColor }}
					></div>
				</div>
			)}
		</aside>
	);
};
