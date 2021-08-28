import React from 'react';
import { UserCrudentials } from '../../types';
import './LoginPanel.css';
import { ImCross } from 'react-icons/im';
import { CgSpinner } from 'react-icons/cg';

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
			style={{ fontSize: '1.7rem', height: '41px' }}
		/>
	);

	return (
		<form onSubmit={props.handleLogin} className="login-form">
			<button
				type="button"
				onClick={props.closeLoginPanel}
				className="button-close-window"
			>
				<ImCross style={{ fontSize: '.8rem' }} />
			</button>
			<input
				required
				max={20}
				onChange={props.handleInputChange}
				value={props.loginInputValue.lastName}
				name="lastName"
				placeholder="Last Name"
				type="text"
				maxLength={30}
			></input>
			<input
				required
				max={20}
				onChange={props.handleInputChange}
				value={props.loginInputValue.password}
				name="password"
				placeholder="Password"
				type="password"
				maxLength={10}
			></input>
			{props.isLoading ? (
				loading
			) : (
				<button type="submit" className="button-generic button-submit-login">
					Log in
				</button>
			)}
		</form>
	);
};
