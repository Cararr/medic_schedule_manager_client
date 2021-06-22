import React, { useState } from 'react';
import { useEmployees } from '../../context/employeesContext';
import './CreateHomeRehabilitationForm.css';

export default function CreateHomeRehabilitationForm() {
	const [formValues, setFormValues] = useState({
		patient: '',
		startsAt: '',
		employee: null,
		dateBegin: '',
		dateEnd: '',
	});

	const employeesListOptions = useEmployees().map((employee) => (
		<option
			key={employee.id}
			value={`${employee.firstName} ${employee.lastName}`}
		/>
	));
	// ZMIEN DATALIST NA SELECT
	return (
		<form className="form-create">
			<h2 className="form-create-header">Create home rehabilitaiton</h2>
			<section className="form-create-inputs">
				<label>Employee:</label>
				<input
					list="employees-list"
					required
					className="form-create-inputs-input"
				></input>
				<datalist id="employees-list">{employeesListOptions}</datalist>
				<label>Patient:</label>
				<input required className="form-create-inputs-input"></input>
				<label>Starts at:</label>
				<input
					required
					type="time"
					className="form-create-inputs-input"
				></input>
				<label>Select start date:</label>
				<input
					type="date"
					required
					className="form-create-inputs-input"
				></input>
				<label>Select end date:</label>
				<input
					type="date"
					required
					className="form-create-inputs-input"
				></input>
			</section>
		</form>
	);
}
