import React from 'react';
import './LoginPanel.css';

export default function LoginPanel(props) {
	return (
		<form onSubmit={props.handleLogin} className="login-form">
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
			<button type="submit" className="submit-login-button button-generic">
				Log in
			</button>
			<button
				type="button"
				onClick={props.closeLoginPanel}
				className="button-generic button-close-window"
			>
				X
			</button>
		</form>
	);
}
