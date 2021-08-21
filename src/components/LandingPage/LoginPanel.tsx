import React from 'react';
import { UserCrudentials } from '../../types';
import './LoginPanel.css';
import { ImCross } from 'react-icons/im';

interface Props {
	handleInputChange: (eventTarget: React.ChangeEvent<HTMLInputElement>) => void;
	loginInputValue: UserCrudentials;
	handleLogin: (e: React.SyntheticEvent) => void;
	closeLoginPanel: () => void;
	isLoading: boolean;
}

export const LoginPanel: React.FunctionComponent<Props> = (props) => {
	return (
		<form onSubmit={props.handleLogin} className="login-form">
			<button
				type="button"
				onClick={props.closeLoginPanel}
				className="button-generic button-close-window"
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
				<i className="icon-spin6" style={{ fontSize: '1.7rem' }} />
			) : (
				<button type="submit" className="submit-login-button button-generic">
					Log in
				</button>
			)}
		</form>
	);
};
