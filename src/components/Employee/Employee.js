import React from 'react';
import './Employee.css';

export default function Employee(props) {
	const handleOnDragStart = (e) => {
		e.dataTransfer.setData('employee', JSON.stringify(props.employee));
	};
	const handleOnDragOver = (e) => {
		e.stopPropagation();
	};
	return (
		<li>
			<p
				className="list-item employee"
				onDragOver={handleOnDragOver}
				onDragStart={handleOnDragStart}
				draggable={true}
			>
				{`${props.employee.firstName} ${props.employee.lastName}`}
			</p>
		</li>
	);
}
