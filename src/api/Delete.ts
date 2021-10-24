import { PATH } from 'config.json';
import { HomeRehabilitation, Comment } from 'types';

export default class Delete {
	static homeRehabilitation = async (
		homeRehabilitation: HomeRehabilitation
	) => {
		try {
			const response = await fetch(
				`${PATH}/home-rehabilitations/${homeRehabilitation.id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			);
			return response.ok;
		} catch (error) {
			console.error(error);
		}
	};

	static vacation = async (vacationId: string) => {
		try {
			const response = await fetch(`${PATH}/vacations/${vacationId}`, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			return response.ok;
		} catch (error) {
			console.error(error);
		}
	};

	static comment = async (comment: Comment) => {
		try {
			const response = await fetch(`${PATH}/comments/${comment.id}`, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			return response.ok;
		} catch (error) {
			console.error(error);
		}
	};
}
