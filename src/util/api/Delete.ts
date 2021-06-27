import { serverPath } from '../../config.json';

export default class Delete {
	static homeRehabilitation = async (homeRehabilitationId: number) => {
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
}
