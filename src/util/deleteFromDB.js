import { serverPath } from '../config.json';

export const deleteHomeRehabilitation = async (homeRehabilitationId) => {
	try {
		const response = await fetch(
			`${serverPath}/home-rehabilitations/${homeRehabilitationId}`,
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
