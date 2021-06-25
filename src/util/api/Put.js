import { serverPath } from '../../config.json';

export default class Put {
	static schedule = async (date, schedules) => {
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

	static homeRehabilitation = async (homeRehabilitation) => {
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


}
