import { serverPath } from '../config.json';

export const getEmployees = async () => {
	try {
		const response = await fetch(`${serverPath}/employees`);
		if (response.ok) {
			const jsonRespone = await response.json();
			return jsonRespone.employees;
		}
	} catch (error) {
		console.error(error);
	}
};

export const getWorkStageSpans = async () => {
	try {
		const response = await fetch(`${serverPath}/workstagespans`);
		if (response.ok) {
			const jsonRespone = await response.json();
			return jsonRespone.workStageSpans;
		}
	} catch (error) {
		console.error(error);
	}
};

export const getSchedulesByDate = async (date) => {
	try {
		const schedulesResponse = await fetch(
			`${serverPath}/schedules?date=${date}`
		);
		const homeRehabilitationsResponse = await fetch(
			`${serverPath}/home-rehabilitaitons?date=${date}`
		);

		if (schedulesResponse.ok && homeRehabilitationsResponse.ok) {
			const jsonRespone = await schedulesResponse.json();
			return jsonRespone.schedules;
		}
	} catch (error) {
		console.error(error);
	}
};

export const generateSchedule = async () => {
	try {
		const response = await fetch(`${serverPath}/schedules/generate`);
		if (response.ok) {
			const jsonRespone = await response.json();
			return jsonRespone.generatedSchedule;
		}
	} catch (error) {
		console.error(error);
	}
};

export const getHomeRehabilitationsByDate = async (date) => {
	try {
		const response = await fetch(
			`${serverPath}/home-rehabilitaitons?date=${date}`
		);
		if (response.ok) {
			const jsonRespone = await response.json();
			return jsonRespone.homeRehabilitations;
		}
	} catch (error) {
		console.error(error);
	}
};
