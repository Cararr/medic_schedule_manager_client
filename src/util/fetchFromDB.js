const PATH = 'http://localhost:4000';

export const loadEmployees = async () => {
	try {
		const response = await fetch(`${PATH}/employees`);
		if (response.ok) {
			const jsonRespone = await response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};

export const loadWorkStageSpans = async () => {
	try {
		const response = await fetch(`${PATH}/workstagespans`);
		if (response.ok) {
			const jsonRespone = response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};

export const loadScheduleByDate = async (date) => {
	try {
		const response = await fetch(`${PATH}/schedule?date=${date}`);
		if (response.ok) {
			const jsonRespone = response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};
