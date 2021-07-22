import { serverPath } from '../../config.json';

export default class Get {
	static employees = async () => {
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

	static workStageSpans = async () => {
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

	static schedulesByDate = async (date: string) => {
		try {
			const schedulesResponse = await fetch(
				`${serverPath}/schedules?date=${date}`
			);
			const homeRehabilitationsResponse = await fetch(
				`${serverPath}/home-rehabilitations?date=${date}`
			);

			if (schedulesResponse.ok && homeRehabilitationsResponse.ok) {
				const jsonRespone = await schedulesResponse.json();
				return jsonRespone.schedules;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static commentByDate = async (date: string) => {
		try {
			const commentResponse = await fetch(
				`${serverPath}/comments?date=${date}`
			);

			if (commentResponse.ok) {
				const jsonRespone = await commentResponse.json();
				return jsonRespone.comment;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static generateSchedule = async (from: string) => {
		try {
			const response = await fetch(
				`${serverPath}/schedules/generate?date=${from}`
			);
			if (response.ok) {
				const jsonRespone = await response.json();
				return jsonRespone.generatedSchedule;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static homeRehabilitationsByDate = async (date: string) => {
		try {
			const response = await fetch(
				`${serverPath}/home-rehabilitations?date=${date}`
			);
			if (response.ok) {
				const jsonRespone = await response.json();
				return jsonRespone.homeRehabilitations;
			}
		} catch (error) {
			console.error(error);
		}
	};
}
