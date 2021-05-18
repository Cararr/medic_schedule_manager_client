import React from 'react';
import { useEmployees } from '../../context/employeesContext';
import Employee from '../Employee/Employee';
import './Employees.css';

export default function Employees() {
	const employees = useEmployees();
	const employeesList = employees?.map((employee) => (
		<Employee employee={employee} key={employee.id} />
	));

	const loading = (
		<li>
			<p className="list-item">Loading...</p>
		</li>
	);

	return (
		<div className="employees-section">
			<h3>Employees:</h3>
			<ul className="list">
				{(employees?.length && employeesList) || loading}
			</ul>
		</div>
	);
}
