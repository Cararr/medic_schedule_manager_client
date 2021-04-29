const PATH = 'http://localhost:4000';

export const loadEmployees = async () => {
	try {
		const response = await fetch(`${PATH}/employees`);
		if (response.ok) {
			const jsonRespone = response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};

export const loadSchedulesByDate = async (date) => {
	try {
		const response = await fetch(`${PATH}/schedules?date=${date}`);
		if (response.ok) {
			const jsonRespone = response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};
