import { serverPath } from '../config.json';

export const postSchedule = async (date, schedule) => {
	try {
		const body = JSON.stringify({ [date]: schedule });
		const config = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		};
		const response = await fetch(`${serverPath}/schedule`, config);
		if (response.ok) {
			const jsonRespone = await response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};
