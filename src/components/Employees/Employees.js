import React from 'react';
import { useEmployees } from '../../context/employeesContext';
import Employee from '../Employee/Employee';
import './Employees.css';

export default function Employees() {
	const employees = useEmployees();
	const employeesList = employees?.map((worker) => (
		<Employee name={worker} key={worker} />
	));

	return (
		<div
			onClick={() => {
				console.log(employees);
			}}
		>
			<h3>Employees:</h3>
			<ul className="Employees_list">
				{(employeesList?.length && employeesList) || 'Loading...'}
			</ul>
		</div>
	);
}
