import api from './api';

export const login = async (inputValues: {}) => {
	try {
		return await api.post('/login', inputValues);
	} catch (error) {
		console.error(error);
	}
};
