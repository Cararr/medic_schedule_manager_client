import { serverPath } from '../config.json';

export const loadEmployees = async () => {
	try {
		const response = await fetch(`${serverPath}/employees`);
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
		const response = await fetch(`${serverPath}/workstagespans`);
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
		const response = await fetch(`${serverPath}/schedule?date=${date}`);
		if (response.ok) {
			const jsonRespone = response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};

export const generateSchedule = async () => {
	try {
		const response = await fetch(`${serverPath}/schedule/generate`);
		if (response.ok) {
			const jsonRespone = response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};
