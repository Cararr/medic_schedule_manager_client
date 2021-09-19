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
	y: string | number = 'center',
	right?: number
) => {
	const config = {
		...genericSettings,
		background: '#f9cdc0',
		y,
		right,
		html: `<h2>${message}</h2>`,
	};
	return new WinBox(title, config);
};

export const createdMessage = () => {
	const config = {
		...genericSettings,
		background: '#d2e589',
		right: 17, // 17 - scrollbar width
		y: 170,
		html: `<h2>👍</h2>`,
	};
	return new WinBox('Created!', config);
};

export const tipsWinbox = () => {
	const config = {
		...genericSettings,
		background: 'var(--backgroundViolet)',
		height: '',
		right: 17,
		html: `
		<ol class="winbox-list-tips">
			<li>			
				Hold <kbd>Ctrl</kbd> while dragging an employee to copy him/her between cells.				
			</li>
			<li>
			<span class="font-blue">Blue</span> employee's name on list means he/she appears three times on a schedule. <span class="font-red">Red</span> font suggest he/she is overloaded (appears more than three times durning a day). 
			</li>
		</ol>`,
		class: 'no-full no-max no-close modern',
	};
	return new WinBox('Tips', config).minimize(true);
};
