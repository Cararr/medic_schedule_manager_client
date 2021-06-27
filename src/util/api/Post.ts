import { serverPath } from '../../config.json';
import Utilities from '../util';
import { CreateHomeRehabilitationFormValues } from '../../components/create/CreateHomeRehabilitationForm';

export default class Post {
	static homeRehabilitations = async (
		homeRehabilitationConfig: CreateHomeRehabilitationFormValues
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
}
