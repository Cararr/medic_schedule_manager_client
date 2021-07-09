import { Employee } from '../types';

export default class Utilities {
	static formatDateString(date: Date) {
		const dateArray = date.toLocaleDateString().split('.');
		const day = Number(dateArray[0]) < 10 ? `0${dateArray[0]}` : dateArray[0];
		return `${dateArray[2]}-${dateArray[1]}-${day}`;
	}

	static checkIfUserIsAdmin(user: Employee | null) {
		return user?.role === 'BOSS';
	}

	static returnEmptyDailyShiftObject() {
		return {
			KINEZA: new Array(12).fill(null),
			FIZYKO: new Array(10).fill(null),
			MASAZ: new Array(4).fill(null),
			WIZYTY: new Array(1).fill(null),
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
}
