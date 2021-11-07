import api from './api';

type instanceType = 'home-rehabilitations' | 'vacations' | 'comments';

export default class Delete {
	static instance = async (type: instanceType, id: number) => {
		try {
			const response = await api.delete(`/${type}/${id}`);
			return response.status === 204;
		} catch (error) {
			console.error(error);
		}
	};
}
