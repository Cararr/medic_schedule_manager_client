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

export interface Schedules {
	[stationName: string]: (Employee | null)[];
}

export interface HomeRehabilitation {
	id: number;
	employee: Employee | null;
	patient: string;
	date: string;
	startTime: string;
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
