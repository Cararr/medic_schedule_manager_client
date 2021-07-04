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
}

export const SchedulesActionPanel: React.FunctionComponent<Props> = (props) => {
	const handleDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (props.setDateForm)
			props.setDateForm((prev) => ({ ...prev, [target.name]: target.value }));
	};

	const dateForm = (
		<form className="form-date">
			<label>From</label>
			<input
				onChange={handleDateChange}
				type="date"
				name="from"
				value={props.dateForm?.from}
			/>
			<label>To</label>
			<input
				onChange={handleDateChange}
				type="date"
				name="to"
				value={props.dateForm?.to}
			/>
		</form>
	);
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
