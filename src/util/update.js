import { serverPath } from '../config.json';

export const updateSchedule = async (date, schedules) => {
	try {
		const body = JSON.stringify({ schedules });
		const config = {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		};
		const response = await fetch(`${serverPath}/schedules/${date}`, config);
		if (response.ok) {
			const jsonRespone = await response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};

export const updateHomeRehabilitation = async (homeRehabilitation) => {
	try {
		const body = JSON.stringify({ homeRehabilitation });
		const config = {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		};
		const response = await fetch(
			`${serverPath}/home-rehabilitations/${homeRehabilitation.id}`,
			config
		);
		if (response.ok) {
			const jsonRespone = await response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};
