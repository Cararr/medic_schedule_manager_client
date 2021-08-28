import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useEmployees } from '../../context/employeesContext';
import Post from '../../api/Post';
import Utilities from '../../util/Utilities';
import { warningMessage } from '../../WinBox/winboxMessages';
import { CreateVacationForm } from '../../types';
import './CreateForm.css';

export const CreateVacation: React.FunctionComponent = () => {
	const employees = useEmployees();
	const [formValues, setFormValues] = useState<CreateVacationForm>(
		returnEmptyForm()
	);

	const [submitResponse, setSubmitResponse] = useState<JSX.Element | null>(
		null
	);

	useEffect(() => {
		setFormValues((prev) => ({ ...prev, employee: employees[0] }));
	}, [employees]);

	const employeesListOptions = employees.map((employee) => (
		<option
			key={employee.id}
			value={JSON.stringify(employee)}
		>{`${employee.firstName} ${employee.lastName}`}</option>
	));

	const handleChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
		setFormValues((prev) => ({
			...prev,
			[target.name]: returnValueByInputName(target),
		}));

	const resetForm = () => {
		setSubmitResponse(null);
		setFormValues({ ...returnEmptyForm(), employee: employees[0] });
	};

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (!Utilities.checkIfEndDateIsAfterBegin(formValues.from, formValues.to))
			return warningMessage(
				'Invalid date!',
				'End date cannot come before the beginning!',
				170
			);

		setSubmitResponse(
			<div className="response-create" style={{ marginTop: '5rem' }}>
				{<i className="icon-spin6" style={{ fontSize: '5rem' }} />}
			</div>
		);

		const failMessage = 'Create failed. Reason: ';
		const response = await Post.vacation(formValues);
		const jsonResponse =
			response?.status === 500 ? 'server failed' : await response?.json();

		setSubmitResponse(
			<div
				style={{ marginTop: response?.ok ? '5rem' : 0 }}
				className="response-create"
			>
				<h3>
					{response?.ok
						? jsonResponse.message
						: failMessage + jsonResponse.message}
				</h3>
				<button onClick={resetForm} type="button" className="button-generic">
					Back
				</button>
			</div>
		);
	};

	return (
		<section className="section-create" style={{ height: '21rem' }}>
			<h2 className="header-create">Create vacation</h2>
			{submitResponse || (
				<form onSubmit={handleSubmit} className="form-create">
					<label>Employee</label>
					<select onChange={handleChange} name="employee">
						{employeesListOptions}
					</select>

					<label>From</label>
					<input
						onChange={handleChange}
						value={formValues.from}
						name="from"
						required
						type="date"
					/>

					<label>To</label>
					<input
						onChange={handleChange}
						value={formValues.to}
						name="to"
						type="date"
						required
					/>

					<button className="button-generic" type="submit">
						Create
					</button>
				</form>
			)}
		</section>
	);
};

function returnValueByInputName(
	eventTarget: EventTarget & (HTMLInputElement | HTMLSelectElement)
) {
	switch (eventTarget.name) {
		case 'employee':
			return JSON.parse(eventTarget.value);
		case 'startTime':
			return `${eventTarget.value}:00`;
		default:
			return eventTarget.value;
	}
}

function returnEmptyForm(): CreateVacationForm {
	return {
		employee: null,
		from: Utilities.formatDateString(new Date()),
		to: Utilities.formatDateString(Utilities.addDay(new Date())),
	};
}