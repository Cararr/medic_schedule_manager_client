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

export const warningMessage = (
	title: string,
	message: string,
	y: string | number = 'center'
) => {
	const config = {
		...genericSettings,
		background: '#f9cdc0',
		y,
		html: `<h2>${message}</h2>`,
	};
	return new WinBox(title, config);
};

export const createdMessage = () => {
	const config = {
		...genericSettings,
		background: '#d2e589',
		y: 170,
		html: `<h2>👍</h2>`,
	};
	return new WinBox('Created!', config);
};
