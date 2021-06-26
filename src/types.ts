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
	KINEZA: Employee | null[];
	FIZYKO: Employee | null[];
	MASAZ: Employee | null[];
	WIZYTY: Employee | null[];
}

export interface HomeRehabilitation {
	id?: number;
	employee: Employee;
	date: string;
	startTime: string;
}
