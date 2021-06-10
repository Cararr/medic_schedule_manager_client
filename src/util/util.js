export class Utilities {
	static formatDateString(date) {
		const dateArray = date.toLocaleDateString().split('.');
		const day = Number(dateArray[0]) < 10 ? `0${dateArray[0]}` : dateArray[0];
		return `${dateArray[2]}-${dateArray[1]}-${day}`;
	}
	static checkIfUserIsAdmin(user) {
		return user.role === 'BOSS';
	}
}
