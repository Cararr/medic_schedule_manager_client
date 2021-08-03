import { RouteComponentProps } from 'react-router-dom';

export enum employeeRole {
	BOSS = 'BOSS',
	EMPLOYEE = 'EMPLOYEE',
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

export interface CompleteSchedule {
	schedules: StationSchedules;
	homeRehabilitations: HomeRehabilitation[];
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
	component: React.FunctionComponent<RouteComponentProps>;
	path: string;
	exact?: boolean;
}

export interface WorkStageSpans {
	from: string;
	to: string;
}

export interface DateForm {
	from: string;
	to: string;
}

export interface postSchedulesPayload {
	from: string;
	to: string;
	schedules: StationSchedules;
}

export interface CreateHomeRehabilitationForm {
	employee: Employee | null;
	patient: string;
	startTime: string;
	dateBegin: string;
	dateEnd: string;
}

export interface CreateVacationForm {
	employee: Employee | null;
	from: string;
	to: string;
}

export interface Comment {
	id: number;
	date: string;
	content: string;
}

export interface Vacation {
	id: number;
	from: string;
	to: string;
	employee: Employee;
}
