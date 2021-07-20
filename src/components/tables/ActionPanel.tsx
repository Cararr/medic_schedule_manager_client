import React, { ChangeEvent } from 'react';
import { DateForm } from '../../types';
import './ActionPanel.css';

interface Props {
	autoGenerateSchedule?: () => Promise<void>;
	clearSchedule?: () => void;
	areChangesSaved?: boolean;
	saveScheudle?: () => Promise<void>;
	dateForm?: DateForm;
	setDateForm?: React.Dispatch<React.SetStateAction<DateForm>>;
	createSchedules?: (e: React.SyntheticEvent) => Promise<void>;
	isLoading?: boolean;
}

export const ActionPanel: React.FunctionComponent<Props> = (props) => {
	const handleDateChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (props.setDateForm)
			props.setDateForm((prev) => ({ ...prev, [target.name]: target.value }));
	};

	const isCreate = Boolean(props.dateForm);
	const isView = Boolean(props.saveScheudle);

	const loading = <i className="icon-spin6" style={{ fontSize: '1.5rem' }} />;

	const dateForm = (
		<form
			onSubmit={props.createSchedules}
			className="form-create-schedules-date"
		>
			<label>From</label>
			<input
				required
				onChange={handleDateChange}
				type="date"
				min="2020-01-01"
				name="from"
				value={props.dateForm?.from}
			/>
			<label>To</label>
			<input
				required
				onChange={handleDateChange}
				type="date"
				max="2030-12-31"
				name="to"
				value={props.dateForm?.to}
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
				{props.areChangesSaved ? 'No changes to save' : 'Unsaved changes!'}
			</p>
			<div
				className="status-bar"
				style={{ backgroundColor: props.areChangesSaved ? 'green' : 'yellow' }}
			></div>
		</div>
	);

	return (
		<aside className="action-panel">
			<h3>Actions</h3>
			<ul className="list">
				{isCreate && (
					<li>
						<button
							onClick={props.autoGenerateSchedule}
							className="list-item button-generic"
						>
							Generate
						</button>
					</li>
				)}
				{isCreate && (
					<li>
						<button
							onClick={props.clearSchedule}
							className="list-item button-generic"
						>
							Clear
						</button>
					</li>
				)}
				{isView && (
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
			{isCreate && dateForm}
			{isView && statusBar}
		</aside>
	);
};
