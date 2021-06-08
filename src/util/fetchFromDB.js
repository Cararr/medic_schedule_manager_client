import { serverPath } from '../config.json';

export const getEmployees = async () => {
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

export const getWorkStageSpans = async () => {
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

export const getScheduleByDate = async (date) => {
	try {
		const response = await fetch(`${serverPath}/schedules?date=${date}`);
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
		const response = await fetch(`${serverPath}/schedules/generate`);
		if (response.ok) {
			const jsonRespone = response.json();
			return jsonRespone;
		}
	} catch (error) {
		console.error(error);
	}
};
