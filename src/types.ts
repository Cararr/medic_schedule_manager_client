export enum employeeRole {
	BOSS = 'BOSS',
	EMPLOYEE = 'EMPLOYEE',
}

export enum StationName {
	KINEZA = 'KINEZA',
	FIZYKO = 'FIZYKO',
	MASAZ = 'MASAZ',
	WIZYTY = 'WIZYTY',
}

export interface Employee {
	id: string;
	firstName: string;
	lastName: string;
	role: employeeRole;
}

export interface StationSchedules {
	[stationName: string]: (Employee | null)[];
}

export interface HomeRehabilitation {
	id: number;
	employee: Employee | null;
	patient: string;
	date: string;
	startTime: string;
}

export interface Comment {
	id: number;
	date: string;
	content: string;
}

export interface Schedules {
	stationSchedules: StationSchedules;
	homeRehabilitations: HomeRehabilitation[];
	comment: Comment;
}

export interface UserCrudentials {
	lastName: string;
	password: string;
}

export interface CardProperties {
	path: string;
	name: string;
	image: string;
	adminOnly?: boolean;
}

export interface RoutingProperties {
	component: React.FunctionComponent;
	path: string;
}

export interface WorkStageSpans {
	from: string;
	to: string;
}

export interface DateForm {
	from: string;
	to: string;
}

export interface postSchedulesForm {
	from: string;
	to: string;
	schedules: StationSchedules;
}

export interface CreateHomeRehabilitationForm {
	employee: Employee | null;
	patient: string;
	startTime: string;
	from: string;
	to: string;
}

export interface Vacation {
	id: number;
	from: string;
	to: string;
	employee: Employee;
}
