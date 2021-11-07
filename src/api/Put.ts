import { StationSchedules, HomeRehabilitation, Comment, Vacation } from 'types';
import api from './api';

type instanceType =
	| 'schedules'
	| 'home-rehabilitations'
	| 'vacations'
	| 'comments';

export default class Put {
	static instance = async (
		type: instanceType,
		payload: Comment | Vacation | HomeRehabilitation
	) => {
		try {
			const body = createRequestBody(type, payload);
			const response = await api.put(`/${type}/${payload.id}`, body);
			return response.status === 200;
		} catch (error) {
			console.error(error);
		}
	};

	static schedule = async (date: string, schedules: StationSchedules) => {
		try {
			const response = await api.put(`/schedules/${date}`, {
				schedules,
			});
			return response.status === 200;
		} catch (error) {
			console.error(error);
		}
	};
}

function createRequestBody(
	type: instanceType,
	payload: Comment | Vacation | HomeRehabilitation
) {
	switch (type) {
		case 'comments':
			return { comment: payload };
		case 'home-rehabilitations':
			return { homeRehabilitation: payload };
		case 'vacations':
			return { vacation: payload };
		default:
			return payload;
	}
}
