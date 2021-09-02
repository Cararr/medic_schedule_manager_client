import { PATH } from '../config.json';
import {
	postSchedulesPayload,
	CreateHomeRehabilitationForm,
	Comment,
	CreateVacationForm,
} from '../types';

export default class Post {
	static schedules = async (payload: postSchedulesPayload) => {
		const body = JSON.stringify(payload);
		try {
			const response = await fetch(`${PATH}/schedules`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			});
			return response;
		} catch (error) {
			console.error(error);
		}
	};

	static vacation = async (vacation: CreateVacationForm) => {
		try {
			const body = JSON.stringify({ vacation });
			const config = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			};
			const response = await fetch(`${PATH}/vacations/`, config);
			return response;
		} catch (error) {
			console.error(error);
		}
	};

	static homeRehabilitations = async (
		homeRehabilitationConfig: CreateHomeRehabilitationForm
	) => {
		const body = {
			from: homeRehabilitationConfig.from,
			to: homeRehabilitationConfig.to,
			homeRehabilitation: {
				startTime: homeRehabilitationConfig.startTime,
				employee: homeRehabilitationConfig.employee,
				patient: homeRehabilitationConfig.patient,
			},
		};

		try {
			const response = await fetch(`${PATH}/home-rehabilitations`, {
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

	static comment = async (comment: Comment) => {
		try {
			const body = JSON.stringify({ comment });
			const config = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			};
			const response = await fetch(`${PATH}/comments/`, config);
			if (response.ok) {
				const jsonRespone = await response.json();
				return jsonRespone.comment;
			}
		} catch (error) {
			console.error(error);
		}
	};
}
