import React, { useState } from 'react';
import { UserCrudentials } from 'types';
import { ImCross } from 'react-icons/im';
import { CgSpinner } from 'react-icons/cg';
import { useHistory } from 'react-router';
import { errorMessage } from 'WinBox/winboxMessages';
import { login } from 'api/login';
import { useEmployees } from 'providers/EmployeesContext';
import { useUser } from 'providers/UserContext';
import { FieldValues, useForm } from 'react-hook-form';
import styles from './landingPage.module.scss';

export const LoginPanel: React.FunctionComponent = () => {
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);

	const { changeUser } = useUser();
	const { employees, loadEmployees } = useEmployees();

	const { register, handleSubmit, reset } = useForm({
		defaultValues: returnEmptyLoginValues(),
	});

	const onSubmit = async (formData: FieldValues) => {
		setIsLoading(true);

		const response = await login(formData);

		setIsLoading(false);

		reset(returnEmptyLoginValues());

		if (response?.status === 201) {
			if (!employees.length) loadEmployees();
			changeUser(response.data.user);
			history.push('/home');
		} else {
			if (!response || ![400, 401].includes(response.status))
				return errorMessage(
					'Login failed',
					'Something went wrong, please try again later!'
				);
			errorMessage('Login failed', response.data.message);
		}
	};

	const handleCloseLoginPanel = () => history.push('/');

	const loading = (
		<CgSpinner
			className="spin"
			style={{
				fontSize: '1.54rem',
				margin: 'auto',
				display: 'block',
			}}
		/>
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<button
				onClick={handleCloseLoginPanel}
				type="button"
				className={styles.buttonClose}
			>
				<ImCross />
			</button>

			<div className={styles.content}>
				<label>Login</label>
				<input required {...register('lastName', { maxLength: 30 })} />
				<label>Hasło</label>
				<input
					required
					{...register('password', { maxLength: 10 })}
					type="password"
				/>
				<div className={styles.submitButton}>
					{isLoading ? (
						loading
					) : (
						<button type="submit" className="button">
							Zaloguj sie
						</button>
					)}
				</div>
			</div>
		</form>
	);
};

const returnEmptyLoginValues = (): UserCrudentials => ({
	lastName: '',
	password: '',
});
