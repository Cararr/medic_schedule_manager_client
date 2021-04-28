const PATH = 'http://localhost:4000';

export const loadEmployees = async () => {
	try {
		const response = await fetch(`${PATH}/employees`);

		if (response.ok) {
			const jsonRespone = response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.log(error.message);
	}
};
