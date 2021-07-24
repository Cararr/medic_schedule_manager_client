import WinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';

const genericSettings = {
	x: 'center',
	y: 'center',
	border: 5,
	height: 250,
	width: 400,
	class: 'no-full no-max no-min modern',
};

const warningSettings = {
	background: '#f9cdc0',
};

const successSettings = {
	background: '#d2e589',
};

export const genericWarning = (y: number | 'center' = 'center') => {
	const config = {
		...genericSettings,
		...warningSettings,
		y,
		html: `<h2>Action aborted, something went wrong. Sorry!</h2>`,
	};
	return new WinBox('Error', config);
};

export const loginWarning = (message: string | undefined) => {
	const config = {
		...genericSettings,
		...warningSettings,
		html: `<h2>${
			message || "Can't login right now 😔 Please try again later. "
		}</h2>`,
	};
	return new WinBox('Login failed', config);
};

export const accessDeniedWarning = (reason: string) => {
	const config = {
		...genericSettings,
		...warningSettings,
		html: `<h2>${reason}</h2>`,
	};
	return new WinBox('Access denied!', config);
};

export const noEmployeeWarning = () => {
	const config = {
		...genericSettings,
		...warningSettings,
		html: `<h2>An employee must be present at home rehabilitation!</h2>`,
	};
	return new WinBox('Employee is missing', config);
};

export const incorrectDateWarning = () => {
	const config = {
		...genericSettings,
		...warningSettings,
		y: 170,
		html: `<h2>End date cannot come before the beginning!</h2>`,
	};
	return new WinBox('Wrong date set!', config);
};

export const createdMessage = () => {
	const config = {
		...genericSettings,
		...successSettings,
		y: 170,
		html: `<h2>👍</h2>`,
	};
	return new WinBox('Created!', config);
};
