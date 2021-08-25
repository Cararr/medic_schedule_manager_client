import { PATH } from '../config.json';

export default class Get {
	static employees = async () => {
		try {
			const response = await fetch(`${PATH}/employees`);
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
			const response = await fetch(`${PATH}/workstagespans`);
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
			const schedulesResponse = await fetch(`${PATH}/schedules?date=${date}`);
			const homeRehabilitationsResponse = await fetch(
				`${PATH}/home-rehabilitations?date=${date}`
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
			const commentResponse = await fetch(`${PATH}/comments?date=${date}`);

			if (commentResponse.ok) {
				const jsonRespone = await commentResponse.json();
				return jsonRespone.comment;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static generateSchedule = async () => {
		try {
			const response = await fetch(`${PATH}/schedules/generate`);
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
			const response = await fetch(`${PATH}/home-rehabilitations?date=${date}`);
			if (response.ok) {
				const jsonRespone = await response.json();
				return jsonRespone.homeRehabilitations;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static vacationsByYear = async (year: number) => {
		try {
			const response = await fetch(`${PATH}/vacations?year=${year}`);
			if (response.ok) {
				const jsonRespone = await response.json();
				return jsonRespone.vacations;
			}
		} catch (error) {
			console.error(error);
		}
	};
}
