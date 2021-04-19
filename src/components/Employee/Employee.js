import React from 'react';
import './Employee.css';

export default function Employee(props) {
	const onDragStart = (e) => {
		e.dataTransfer.setData('employee', e.target.innerText);
	};
	const onDragOver = (e) => {
		e.stopPropagation();
	};
	return (
		<li>
			<p
				className="employee"
				onDragOver={onDragOver}
				onDragStart={onDragStart}
				draggable={true}
			>
				{props.name}
			</p>
		</li>
	);
}
