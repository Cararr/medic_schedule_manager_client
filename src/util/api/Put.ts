import { serverPath } from '../../config.json';
import { Schedules, HomeRehabilitation } from '../../types';

export default class Put {
	static schedule = async (date: string, schedules: Schedules) => {
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

	static homeRehabilitation = async (
		homeRehabilitation: HomeRehabilitation
	) => {
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
