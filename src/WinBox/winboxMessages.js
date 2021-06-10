import WinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';

const genericWarningSettings = {
	x: 'center',
	y: 'center',
	border: 5,
	height: 250,
	width: 400,
	class: 'no-full no-max no-min',
	background: '#f9cdc0',
};

export const loginWarning = (message) => {
	const loginPanelConfig = {
		...genericWarningSettings,
		html: `<h2>${
			message || "Can't login right now 😔 Please try again later. "
		}</h2>`,
	};
	new WinBox('Login failed', loginPanelConfig);
};

export const pleaseLogInFirstWarning = () => {
	const loginPanelConfig = {
		...genericWarningSettings,
		html: `<h2>${'You must be logged to access this page!'}</h2>`,
	};
	new WinBox('Access denied!', loginPanelConfig);
};
