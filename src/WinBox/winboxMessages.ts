import WinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';

const genericWarningSettings = {
	x: 'center',
	y: 'center',
	border: 5,
	height: 250,
	width: 400,
	class: 'no-full no-max no-min modern',
	background: '#f9cdc0',
};

export const genericWarning = () => {
	const config = {
		...genericWarningSettings,
		html: `<h2>Action aborted, something went wrong. Sorry!</h2>`,
	};
	new WinBox('Error', config);
};

export const loginWarning = (message: string | undefined) => {
	const config = {
		...genericWarningSettings,
		html: `<h2>${
			message || "Can't login right now 😔 Please try again later. "
		}</h2>`,
	};
	new WinBox('Login failed', config);
};

export const accessDeniedWarning = (reason: string) => {
	const config = {
		...genericWarningSettings,
		html: `<h2>${reason}</h2>`,
	};
	new WinBox('Access denied!', config);
};

export const noEmployeeWarning = () => {
	const config = {
		...genericWarningSettings,
		html: `<h2>An employee must be present at home rehabilitation!</h2>`,
	};
	new WinBox('Employee is missing', config);
};

export const wrongDateSet = () => {
	const config = {
		...genericWarningSettings,
		y: 170,
		html: `<h2>The end cannot come before the beginning!</h2>`,
	};
	new WinBox('Wrong date set!', config);
};
