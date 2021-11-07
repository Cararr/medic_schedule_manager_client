import axios from 'axios';
import { PATH } from 'config.json';

const api = axios.create({
	baseURL: PATH,
	headers: {
		Accept: 'application/json',
		'Content-type': 'application/json; charset=UTF-8',
	},
	validateStatus: (status) => status < 500,
});

export default api;
