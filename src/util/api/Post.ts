import { serverPath } from '../../config.json';
import {
	postSchedulesPayload,
	CreateHomeRehabilitationForm,
} from '../../types';

export default class Post {
	static homeRehabilitations = async (
		homeRehabilitationConfig: CreateHomeRehabilitationForm
	) => {
		const body = {
			from: homeRehabilitationConfig.dateBegin,
			to: homeRehabilitationConfig.dateEnd,
			homeRehabilitation: {
				startTime: homeRehabilitationConfig.startTime,
				employee: homeRehabilitationConfig.employee,
				patient: homeRehabilitationConfig.patient,
			},
		};

		try {
			const response = await fetch(`${serverPath}/home-rehabilitations`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
			return response;
		} catch (error) {
			console.error(error);
		}
	};

	static schedules = async (payload: postSchedulesPayload) => {
		const body = JSON.stringify(payload);
		try {
			const response = await fetch(`${serverPath}/schedules`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			});
			return response.json();
		} catch (error) {
			console.error(error);
		}
	};
}
