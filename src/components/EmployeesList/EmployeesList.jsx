import React from 'react';
import { useEmployees } from '../../context/employeesContext';
import EmployeeListItem from '../EmployeeListItem/EmployeeListItem.jsx';
import './EmployeesList.css';

export default function EmployeesList() {
	const employees = useEmployees();
	const employeesList = employees?.map((employee) => (
		<EmployeeListItem employee={employee} key={employee.id} />
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
}
