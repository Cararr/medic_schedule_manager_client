import { serverPath } from '../config.json';
import { Utilities } from './util';

export const postHomeRehabilitations = async homeRehabilitationConfig => {
  const body = { homeRehabilitations: [] }

  const homeRehabilitationTemplate = {
    employee: homeRehabilitationConfig.employee,
    patient: homeRehabilitationConfig.patient,
    startTime: homeRehabilitationConfig.startTime
  }

  let date = new Date(homeRehabilitationConfig.dateBegin);

  while (date <= new Date(homeRehabilitationConfig.dateEnd)) {
    const homeRehabilitation = { ...homeRehabilitationTemplate, date: Utilities.formatDateString(date) }
    if (![6, 0].includes(date.getDay())) //saturdays and sundays shouldn't be saved
      body.homeRehabilitations.push(homeRehabilitation)
    date = incrementDateByDay(date);
  }

  try {
    const response = await fetch(
      `${serverPath}/home-rehabilitations`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    );
    return response.ok;
  } catch (error) {
    console.error(error);
  }
}

function incrementDateByDay(date) {
  return new Date(date.setDate(date.getDate() + 1));
}