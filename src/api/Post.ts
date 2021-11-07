import api from './api';

type instanceType =
	| 'schedules'
	| 'home-rehabilitations'
	| 'vacations'
	| 'comments';

export default class Post {
	static instance = async (type: instanceType, payload: {}) => {
		try {
			const body = createRequestBody(type, payload);
			const response = await api.post(`/${type}`, body);
			return response.status === 201;
		} catch (error) {
			console.error(error);
		}
	};
}

function createRequestBody(type: instanceType, payload: {}) {
	switch (type) {
		case 'comments':
			return { comment: payload };
		case 'vacations':
			return { vacation: payload };
		default:
			return payload;
	}
}
