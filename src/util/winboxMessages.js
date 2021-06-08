import WinBox from 'winbox/src/js/winbox';
import 'winbox/dist/css/winbox.min.css';
export const loginWarning = (message) => {
	const loginPanelConfig = {
		x: 'center',
		y: 'center',
		border: 5,
		height: 250,
		width: 400,
		class: 'no-full no-max no-min',
		background: '#cdc0f9',
		html: `<h2>${
			message || "Can't login right now 😔 Please try again later. "
		}</h2>`,
	};
	new WinBox('Login failed', loginPanelConfig);
};
