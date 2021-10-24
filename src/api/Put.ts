import { PATH } from 'config.json';
import { StationSchedules, HomeRehabilitation, Comment, Vacation } from 'types';

export default class Put {
	static schedule = async (date: string, schedules: StationSchedules) => {
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
			const response = await fetch(`${PATH}/schedules/${date}`, config);
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
				`${PATH}/home-rehabilitations/${homeRehabilitation.id}`,
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

	static vacation = async (vacation: Vacation) => {
		try {
			const body = JSON.stringify({ vacation });
			const config = {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			};
			const response = await fetch(`${PATH}/vacations/${vacation.id}`, config);
			return response.ok;
		} catch (error) {
			console.error(error);
		}
	};

	static comment = async (comment: Comment) => {
		try {
			const body = JSON.stringify({ comment });
			const config = {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			};
			const response = await fetch(`${PATH}/comments/${comment.id}`, config);
			if (response.ok) {
				const jsonRespone = await response.json();
				return jsonRespone;
			}
		} catch (error) {
			console.error(error);
		}
	};
}
