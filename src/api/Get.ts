import api from './api';

export default class Get {
	static employees = async () => {
		try {
			const response = await api.get('/employees');
			if (response.status === 200) return response.data.employees;
		} catch (error) {
			console.error(error);
		}
	};

	static workStageSpans = async () => {
		try {
			const response = await api.get(`/workstagespans`);
			if (response.status === 200) return response.data.workStageSpans;
		} catch (error) {
			console.error(error);
		}
	};

	static schedulesByDate = async (date: string) => {
		try {
			const response = await api.get('/schedules', {
				params: { date },
			});

			if (response.status === 200) {
				return response.data.schedules;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static homeRehabilitationsByDate = async (date: string) => {
		try {
			const response = await api.get('/home-rehabilitations', {
				params: { date },
			});
			if (response.status === 200) {
				return response.data.homeRehabilitations;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static commentByDate = async (date: string) => {
		try {
			const response = await api.get('/comments', {
				params: { date },
			});
			if (response.status === 200) {
				return response.data.comment;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static generateSchedule = async () => {
		try {
			const response = await api.get(`/schedules/generate`);
			if (response.status === 200) {
				return response.data.generatedSchedule;
			}
		} catch (error) {
			console.error(error);
		}
	};

	static vacationsByYear = async (year: number) => {
		try {
			const response = await api.get(`/vacations`, {
				params: { year },
			});
			if (response.status === 200) {
				return response.data.vacations;
			}
		} catch (error) {
			console.error(error);
		}
	};
}
