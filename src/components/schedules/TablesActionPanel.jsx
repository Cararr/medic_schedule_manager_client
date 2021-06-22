import React from 'react';
import './TablesActionPanel.css';

export default function TablesActionPanel(props) {
	const statusColor = props.areChangesSaved ? 'green' : 'yellow';
	const statusText = props.areChangesSaved
		? 'No changes to save'
		: 'Unsaved changes!';
	return (
		<aside className="action-panel">
			<h3>Actions:</h3>
			<ul className="list">
				<li>
					<button
						onClick={props.saveScheudle}
						className="list-item button-generic"
					>
						Save
					</button>
				</li>
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
			</ul>
			<h3>Status:</h3>
			<div className="action-panel-status">
				<p className="status-text">{statusText}</p>
				<div
					className="status-bar"
					style={{ backgroundColor: statusColor }}
				></div>
			</div>
		</aside>
	);
}
