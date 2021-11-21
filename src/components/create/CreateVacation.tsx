import React, { useState } from 'react';
import { useEmployees } from 'providers/EmployeesContext';
import { FieldValues, useForm } from 'react-hook-form';
import Post from 'api/Post';
import Utilities from 'util/Utilities';
import { errorMessage } from 'WinBox/winboxMessages';
import { CgSpinner } from 'react-icons/cg';
import styles from './create.module.scss';
import globalStyles from 'globalStyles.module.scss';

export const CreateVacation: React.FunctionComponent = () => {
	const { employees } = useEmployees();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			employee: null,
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
			<div className={styles.response} style={{ marginTop: '5rem' }}>
				<CgSpinner
					className={globalStyles.spin}
					style={{
						fontSize: '5rem',
					}}
				/>
			</div>
		);

		const payload = {
			...formData,
			employee:
				employees.find((emp) => emp.id === formData.employee) || employees[0],
		};

		const success = await Post.instance('vacations', payload);

		setResponse(
			<div
				style={{ marginTop: success ? '5rem' : 0 }}
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

	const max = '2050-12-31';

	return (
		<section className={styles.section} style={{ height: '19rem' }}>
			<h2 className={styles.header}>Create vacation</h2>
			{response || (
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<label>Employee</label>
					<select required {...register('employee')}>
						{employeesListOptions}
					</select>

					<label>From</label>
					<input {...register('from', { max })} type="date" required />

					<label>To</label>
					<input {...register('to', { max })} type="date" required />

					<button className={globalStyles.button} type="submit">
						Create
					</button>
				</form>
			)}
		</section>
	);
};
