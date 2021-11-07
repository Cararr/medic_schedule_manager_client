import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useEmployees } from 'providers/EmployeesContext';
import Post from 'api/Post';
import Utilities from 'util/Utilities';
import { errorMessage } from 'WinBox/winboxMessages';
import { CreateHomeRehabilitationForm } from 'types';
import { CgSpinner } from 'react-icons/cg';
import styles from './create.module.scss';
import globalStyles from 'globalStyles.module.scss';

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
			return errorMessage(
				'Invalid date!',
				'End date cannot come before the beginning!',
				170,
				17
			);

		setSubmitResponse(
			<div style={{ marginTop: '8rem' }} className={styles.response}>
				<CgSpinner
					className={globalStyles.spin}
					style={{
						fontSize: '5rem',
					}}
				/>
			</div>
		);

		const payload = {
			from: formValues.from,
			to: formValues.to,
			homeRehabilitation: {
				startTime: formValues.startTime,
				employee: formValues.employee,
				patient: formValues.patient,
			},
		};

		const success = await Post.instance('home-rehabilitations', payload);

		setSubmitResponse(
			<div
				style={{ marginTop: success ? '8rem' : 0 }}
				className={styles.response}
			>
				<h3 style={{ marginBottom: '1rem' }}>
					{success
						? 'Created!'
						: 'Action aborted, something went wrong. Sorry!'}
				</h3>
				<button
					onClick={resetForm}
					type="button"
					className={globalStyles.button}
				>
					Back
				</button>
			</div>
		);
	};

	return (
		<section className={styles.section} style={{ height: '26rem' }}>
			<h2 className={styles.header}>Create home rehabilitation</h2>
			{submitResponse || (
				<form onSubmit={handleSubmit} className={styles.form}>
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
					<button className={globalStyles.button} type="submit">
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
