import React, { useState } from 'react';
import { useEmployees } from 'providers/EmployeesContext';
import { FieldValues, useForm } from 'react-hook-form';
import Post from 'api/Post';
import Utilities from 'util/Utilities';
import { errorMessage } from 'WinBox/winboxMessages';
import { CgSpinner } from 'react-icons/cg';
import styles from './create.module.scss';
import globalStyles from 'globalStyles.module.scss';

export const CreateHomeRehabilitation: React.FunctionComponent = () => {
	const { employees } = useEmployees();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			employee: null,
			patient: '',
			startTime: '',
			from: Utilities.formatDateString(new Date()),
			to: Utilities.formatDateString(Utilities.addDay(new Date())),
		},
	});

	const [response, setResponse] = useState<JSX.Element | null>(null);

	const employeesListOptions = employees.map((employee) => (
		<option
			key={employee.id}
			value={employee.id}
		>{`${employee.firstName} ${employee.lastName}`}</option>
	));

	const clearResponse = () => setResponse(null);

	const onSubmit = async (formData: FieldValues) => {
		if (!Utilities.checkIfEndDateIsAfterBegin(formData.from, formData.to))
			return errorMessage(
				'Invalid date!',
				'End date cannot come before the beginning!',
				170,
				17
			);

		setResponse(
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
			from: formData.from,
			to: formData.to,
			homeRehabilitation: {
				startTime: `${formData.startTime}:00`,
				employee:
					employees.find((emp) => emp.id === formData.employee) || employees[0],
				patient: formData.patient,
			},
		};

		const success = await Post.instance('home-rehabilitations', payload);

		setResponse(
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
					onClick={clearResponse}
					type="button"
					className={globalStyles.button}
				>
					Back
				</button>
			</div>
		);
	};

	const maxLength = 25;
	const max = '2050-12-31';

	return (
		<section className={styles.section} style={{ height: '26rem' }}>
			<h2 className={styles.header}>Create home rehabilitation</h2>
			{response || (
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<label>Employee</label>
					<select required {...register('employee')}>
						{employeesListOptions}
					</select>

					<label>Patient</label>
					<input
						required
						{...register('patient', {
							maxLength,
						})}
					/>

					<label>Starts at</label>
					<input required type="time" {...register('startTime')} />

					<label>From</label>
					<input required type="date" {...register('from', { max })} />

					<label>To</label>
					<input required type="date" {...register('to', { max })} />
					<button className={globalStyles.button} type="submit">
						Create
					</button>
				</form>
			)}
		</section>
	);
};
