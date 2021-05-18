import React from 'react';
import './TablesActionPanel.css';

export default function TablesActionPanel(props) {
	return (
		<div className="action-panel">
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
			</ul>
		</div>
	);
}
