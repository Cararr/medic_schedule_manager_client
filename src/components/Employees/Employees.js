import React from 'react';
import data from '../../util/fakeData';
import Employee from '../Employee/Employee';
import './Employees.css';

export default function Employees() {
	const employeesList = data.Employees.map((worker) => (
		<Employee name={worker.name} key={worker.name} />
	));
	return (
		<div>
			<h3>Employees:</h3>
			<ul className="Employees_list">{employeesList}</ul>
		</div>
	);
}
