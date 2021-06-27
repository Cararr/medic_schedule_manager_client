import React, { DragEvent } from 'react';
import { useEmployees } from '../../context/employeesContext';
import { Employee } from '../../types';
import './EmployeesList.css';

export const EmployeesList: React.FunctionComponent = () => {
	const handleOnDragStart = (e: DragEvent, employee: Employee) => {
		e.dataTransfer.setData('employee', JSON.stringify(employee));
	};
	const handleOnDragOver = (e: DragEvent) => {
		e.stopPropagation();
	};
	const employees = useEmployees();
	const employeesList = employees?.map((employee) => (
		<li key={employee.id}>
			<p
				className="list-item draggable"
				onDragOver={handleOnDragOver}
				onDragStart={(e) => handleOnDragStart(e, employee)}
				draggable={true}
			>
				{`${employee.firstName} ${employee.lastName}`}
			</p>
		</li>
	));

	const loading = (
		<li>
			<p className="list-item">Loading...</p>
		</li>
	);

	return (
		<aside className="employees-section">
			<h3>Employees:</h3>
			<ul className="list">
				{(employees?.length && employeesList) || loading}
			</ul>
		</aside>
	);
};
