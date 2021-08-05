import { Employee, Comment, StationSchedules } from '../types';

export default class Utilities {
	static formatDateString(date: Date) {
		const dateArray = date.toLocaleDateString().split('.');
		const day = Number(dateArray[0]) < 10 ? `0${dateArray[0]}` : dateArray[0];
		return `${dateArray[2]}-${dateArray[1]}-${day}`;
	}

	static checkIfUserIsAdmin(user: Employee | null) {
		return user?.role === 'BOSS';
	}

	static returnEmptyDailyShift(): StationSchedules {
		return {
			KINEZA: new Array(14).fill(null),
			FIZYKO: new Array(10).fill(null),
			MASAZ: new Array(4).fill(null),
			WIZYTY: new Array(1).fill(null),
		};
	}

	static returnEmptyComment(date: string): Comment {
		return {
			id: 0,
			date,
			content: '',
		};
	}

	static formatTimeView(time: string) {
		return time.slice(0, 5);
	}

	static incrementDateByDay(date: Date) {
		return new Date(date.setDate(date.getDate() + 1));
	}

	static checkIfEndDateIsAfterBegin(startDate: string, endDate: string) {
		return new Date(endDate) >= new Date(startDate);
	}

	static returnColorPerEmployee(lastName: string): string {
		switch (lastName) {
			case 'Ka.':
				return 'black';
			case 'Ks.':
				return '';
			case 'Ku.':
				return 'deeppink';
			case 'P.':
				return 'brown';
			case 'S.':
				return 'darkgoldenrod';
			case 'T.':
				return 'darkolivegreen';
			case 'W-N.':
				return 'navy';
			case 'Wó.':
				return 'orange';
			case 'Sz.':
				return 'red';
			default:
				return '';
		}
	}
}
