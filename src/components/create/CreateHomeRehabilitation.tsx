import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useEmployees } from '../../context/employeesContext';
import Post from '../../api/Post';
import Utilities from '../../util/Utilities';
import { warningMessage } from '../../WinBox/winboxMessages';
import { CreateHomeRehabilitationForm } from '../../types';

export const CreateHomeRehabilitation: React.FunctionComponent = () => {
	const { employees } = useEmployees();
	const [formValues, setFormValues] = useState<CreateHomeRehabilitationForm>(
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
				170,
				17
			);

		setSubmitResponse(
			<div style={{ marginTop: '8rem' }} className="response-create">
				{<i className="icon-spin6" style={{ fontSize: '5rem' }} />}
			</div>
		);

		const failMessage = 'Create failed. Reason: ';
		const response = await Post.homeRehabilitations(formValues);
		const jsonResponse =
			response?.status === 500 ? 'server failed' : await response?.json();

		setSubmitResponse(
			<div
				style={{ marginTop: response?.ok ? '8rem' : 0 }}
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
		<section className="section-create" style={{ height: '26rem' }}>
			<h2 className="header-create">Create home rehabilitation</h2>
			{submitResponse || (
				<form onSubmit={handleSubmit} className="form-create">
					<label>Employee</label>
					<select onChange={handleChange} name="employee">
						{employeesListOptions}
					</select>

					<label>Patient</label>
					<input
						required
						maxLength={25}
						name="patient"
						onChange={handleChange}
						value={formValues.patient}
					/>

					<label>Starts at</label>
					<input
						required
						type="time"
						name="startTime"
						onChange={handleChange}
						value={Utilities.formatTimeView(formValues.startTime)}
					/>

					<label>From</label>
					<input
						required
						type="date"
						name="from"
						max="2050-12-31"
						onChange={handleChange}
						value={formValues.from}
					/>

					<label>To</label>
					<input
						required
						type="date"
						name="to"
						max="2050-12-31"
						onChange={handleChange}
						value={formValues.to}
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

function returnEmptyForm(): CreateHomeRehabilitationForm {
	return {
		employee: null,
		patient: '',
		startTime: '',
		from: Utilities.formatDateString(new Date()),
		to: Utilities.formatDateString(Utilities.addDay(new Date())),
	};
}
