export class Utilities {
	static formatDateString(date) {
		const dateArray = date.toLocaleDateString().split('.');
		const day = Number(dateArray[0]) < 10 ? `0${dateArray[0]}` : dateArray[0];
		return `${dateArray[2]}-${dateArray[1]}-${day}`;
	}

	static checkIfUserIsAdmin(user) {
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

	static formatTimeView(time) {
		return time.slice(0, 5);
	}
}
