import { Employee, Comment, StationSchedules } from '../types';

export default class Utilities {
	static formatDateString(date: Date) {
		const dateArray = date.toLocaleDateString('pl-PL').split('.');
		const day = Number(dateArray[0]) < 10 ? `0${dateArray[0]}` : dateArray[0];
		return `${dateArray[2]}-${dateArray[1]}-${day}`;
	}

	static checkIfUserIsAdmin(user: Employee | null) {
		return user?.role === 'BOSS';
	}

	static returnEmptyStationSchedules(): StationSchedules {
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

	static addDay(date: Date) {
		return new Date(date.setDate(date.getDate() + 1));
	}

	static subtractDay(date: Date) {
		return new Date(date.setDate(date.getDate() - 1));
	}

	static checkIfEndDateIsAfterBegin(from: string, to: string) {
		return new Date(to) >= new Date(from);
	}

	static returnColorPerEmployee(lastName: string) {
		switch (lastName) {
			case 'Ka.':
				return '#000000';
			case 'Ks.':
				return '#3788d8';
			case 'Ku.':
				return '#ff1493';
			case 'P.':
				return '#a52a2a';
			case 'S.':
				return '#b8860b';
			case 'T.':
				return '#556b2f';
			case 'W-N.':
				return '#000080';
			case 'Wó.':
				return '#ffa500';
			case 'Sz.':
				return '#8b4513';
			default:
				return '';
		}
	}

	static blackOrWhiteFontForContrast(backgroundColorHex: string) {
		//Int values below were found on StackOverflow, i guess they are some color const, dunno
		return (
			[
				0.299 * parseInt(backgroundColorHex.slice(1, 3), 16),
				0.587 * parseInt(backgroundColorHex.slice(3, 5), 16),
				0.114 * parseInt(backgroundColorHex.slice(5, 7), 16),
			].reduce((a, b) => a + b) /
				255 >
			0.5
		);
	}
}
