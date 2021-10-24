import React from 'react';
import { UserCrudentials } from 'types';
import './LoginPanel.css';
import { ImCross } from 'react-icons/im';
import { CgSpinner } from 'react-icons/cg';

interface Props {
	handleInputChange: (eventTarget: React.ChangeEvent<HTMLInputElement>) => void;
	loginInputValue: UserCrudentials;
	handleLogin: (e: React.SyntheticEvent) => void;
	handleCloseLoginPanel: () => void;
	isLoading: boolean;
}

export const LoginPanel: React.FunctionComponent<Props> = (props) => {
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
		<form onSubmit={props.handleLogin} className="form-login">
			<button
				onClick={props.handleCloseLoginPanel}
				type="button"
				className="button-close-window"
			>
				<ImCross />
			</button>

			<div className="form-login-content">
				<label className="label-login-panel">Login</label>
				<input
					required
					max={20}
					onChange={props.handleInputChange}
					value={props.loginInputValue.lastName}
					name="lastName"
					type="text"
					maxLength={30}
				></input>
				<label className="label-login-panel">Hasło</label>
				<input
					required
					max={20}
					onChange={props.handleInputChange}
					value={props.loginInputValue.password}
					name="password"
					type="password"
					maxLength={10}
				></input>
				<div className="container-button-submit-login">
					{props.isLoading ? (
						loading
					) : (
						<button
							type="submit"
							className="button-generic button-submit-login"
						>
							Zaloguj sie
						</button>
					)}
				</div>
			</div>
		</form>
	);
};
