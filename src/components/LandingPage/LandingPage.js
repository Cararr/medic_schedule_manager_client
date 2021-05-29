import React, { useState } from 'react';
import './LandingPage.css';
import scheduleCalendar from './resources/ScheduleEntryLogo.jpg';
import WinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';

export default function LandingPage() {
	const [loginOn, setLoginOn] = useState(false);

	const handleLogin = (e) => {
		console.log(666);
		e.preventDefault();
	};

	const openLoginPanel = () => {
		const loginPanelConfig = {
			x: 'center',
			y: 'center',
			border: 5,
			height: 300,
			width: 400,
			mount: document.getElementById('login-form'),
			class: 'no-full no-max no-min',
			background: '#cdc0f9',
			onclose: handleClose,
		};
		setLoginOn(true);
		new WinBox('Login panel', loginPanelConfig);
		/* 		document
			.getElementById('login-form')
			.addEventListener('submit', handleLogin); */
	};

	const handleClose = () => {
		setLoginOn(false);
		/* 		document
			.getElementById('login-form')
			.removeEventListener('submit', handleLogin); */
	};

	return (
		<div className="landing-page">
			<main>
				<header>
					<h1 className="landing-page-header">Medic Schedule Manager</h1>
				</header>
				<img alt="Schedule Calendar" src={scheduleCalendar} />
				<button
					onClick={!loginOn ? openLoginPanel : undefined}
					className="button-generic"
				>
					Log in
				</button>
			</main>
			<form
				action="http://localhost:3000/home"
				style={{ display: loginOn ? 'flex' : 'none' }}
				id="login-form"
			>
				<input placeholder="Last Name" type="text" maxLength={30}></input>
				<input placeholder="Password" type="password" maxLength={10}></input>
				<button
					id="submit-login-button"
					type="submit"
					className="button-generic"
				>
					Log in
				</button>
			</form>
		</div>
	);
}
