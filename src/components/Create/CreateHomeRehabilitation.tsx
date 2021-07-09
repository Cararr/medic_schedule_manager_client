import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useEmployees } from '../../context/employeesContext';
import Post from '../../util/api/Post';
import Utilities from '../../util/Utilities';
import { incorrectDateWarning } from '../../WinBox/winboxMessages';
import { CreateHomeRehabilitationForm } from '../../types';
import './CreateHomeRehabilitation.css';

export const CreateHomeRehabilitation: React.FunctionComponent = () => {
	const employees = useEmployees();
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
		if (
			!Utilities.checkIfEndDateIsAfterBegin(
				formValues.dateBegin,
				formValues.dateEnd
			)
		)
			return incorrectDateWarning();

		const loading = <i className="icon-spin6" />;
		setSubmitResponse(
			<div className="response-create-home-rehabilitation">{loading}</div>
		);

		const failMessage = 'Create failed. Reason: ';
		const response = await Post.homeRehabilitations(formValues);
		const jsonResponse =
			response?.status === 500 ? 'server failed' : await response?.json();

		setSubmitResponse(
			<div
				style={response?.ok ? {} : { marginTop: 0 }}
				className="response-create-home-rehabilitation"
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
		<section className="section-create-home-rehabilitation">
			<h2 className="header-create-home-rehabilitation">
				Create home rehabilitation
			</h2>
			{submitResponse || (
				<form
					onSubmit={handleSubmit}
					className="form-create-home-rehabilitation"
				>
					<label>Employee</label>
					<select onChange={handleChange} name="employee">
						{employeesListOptions}
					</select>

					<label>Patient</label>
					<input
						maxLength={250}
						onChange={handleChange}
						value={formValues.patient}
						name="patient"
						required
					/>

					<label>Starts at</label>
					<input
						onChange={handleChange}
						value={Utilities.formatTimeView(formValues.startTime)}
						name="startTime"
						required
						type="time"
					/>

					<label>Start date</label>
					<input
						onChange={handleChange}
						value={formValues.dateBegin}
						name="dateBegin"
						type="date"
						required
					/>

					<label>End date</label>
					<input
						onChange={handleChange}
						value={formValues.dateEnd}
						name="dateEnd"
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

function returnEmptyForm(): CreateHomeRehabilitationForm {
	return {
		employee: null,
		patient: '',
		startTime: '',
		dateBegin: Utilities.formatDateString(new Date()),
		dateEnd: Utilities.formatDateString(
			Utilities.incrementDateByDay(new Date())
		),
	};
}
