import React from 'react';
import { UserCrudentials } from '../../types';
import './LoginPanel.css';
import { ImCross } from 'react-icons/im';
import { CgSpinner } from 'react-icons/cg';
import { Link } from 'react-router-dom';

interface Props {
	handleInputChange: (eventTarget: React.ChangeEvent<HTMLInputElement>) => void;
	loginInputValue: UserCrudentials;
	handleLogin: (e: React.SyntheticEvent) => void;
	closeLoginPanel: () => void;
	isLoading: boolean;
}

export const LoginPanel: React.FunctionComponent<Props> = (props) => {
	const loading = (
		<CgSpinner
			className="spin"
			style={{
				fontSize: '1.8rem',
				height: 35,
				margin: 'auto',
				display: 'block',
			}}
		/>
	);

	return (
		<form onSubmit={props.handleLogin} className="form-login">
			<Link to="/">
				<button type="button" className="button-close-window">
					<ImCross style={{ fontSize: '.8rem' }} />
				</button>
			</Link>

			<div className="login-form-content">
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
				{props.isLoading ? (
					loading
				) : (
					<button type="submit" className="button-generic button-submit-login">
						Zaloguj sie
					</button>
				)}
			</div>
		</form>
	);
};
