import { serverPath } from '../../config.json';
import Utilities from '../Utilities';
import {
	postSchedulesPayload,
	CreateHomeRehabilitationForm,
} from '../../types';

export default class Post {
	static homeRehabilitations = async (
		homeRehabilitationConfig: CreateHomeRehabilitationForm
	) => {
		const body: { homeRehabilitations: {}[] } = {
			homeRehabilitations: [],
		};

		const homeRehabilitationTemplate = {
			employee: homeRehabilitationConfig.employee,
			patient: homeRehabilitationConfig.patient,
			startTime: homeRehabilitationConfig.startTime,
		};

		let date = new Date(homeRehabilitationConfig.dateBegin);

		while (date <= new Date(homeRehabilitationConfig.dateEnd)) {
			const homeRehabilitation = {
				...homeRehabilitationTemplate,
				date: Utilities.formatDateString(date),
			};
			if (![6, 0].includes(date.getDay()))
				//saturdays/sundays shouldn't be saved
				body.homeRehabilitations.push(homeRehabilitation);
			date = Utilities.incrementDateByDay(date);
		}

		try {
			const response = await fetch(`${serverPath}/home-rehabilitations`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
			return response;
		} catch (error) {
			console.error(error);
		}
	};

	static schedules = async (payload: postSchedulesPayload) => {
		const body = JSON.stringify(payload);
		try {
			const response = await fetch(`${serverPath}/schedules`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			});
			return response.json();
		} catch (error) {
			console.error(error);
		}
	};
}
