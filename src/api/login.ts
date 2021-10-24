import { PATH } from 'config.json';

export const login = async (inputValues: {}) => {
	try {
		const body = JSON.stringify(inputValues);
		const config = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		};
		const response = await fetch(`${PATH}/login`, config);
		if ([201, 400, 401].includes(response.status)) {
			const jsonRespone = await response.json();
			jsonRespone.passed = response.ok;
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};
