import React, { DragEvent } from 'react';
import { useEmployees } from '../../context/employeesContext';
import { CompleteSchedule, Employee } from '../../types';
import './EmployeesList.css';

interface Props {
	currentSchedule: CompleteSchedule;
	checkForScheduleChanges?: () => void;
}

export const EmployeesList: React.FunctionComponent<Props> = (props) => {
	const handleOnDragStart = (e: DragEvent, employee: Employee) => {
		e.dataTransfer.setData('employee', JSON.stringify(employee));
	};
	const handleOnDragOver = (e: DragEvent) => {
		e.stopPropagation();
	};

	const employees = useEmployees();
	const employeesList = employees?.map((employee) => {
		const occurrences = countOccurrences(props.currentSchedule, employee.id);
		const fontColor = returnFontColor(occurrences);
		return (
			<li key={employee.id}>
				<p
					className="list-item draggable"
					draggable={true}
					onDragOver={handleOnDragOver}
					onDragStart={(e) => handleOnDragStart(e, employee)}
					onDragEnd={props.checkForScheduleChanges}
					style={{ color: fontColor, fontWeight: 'bold' }}
				>
					{`${employee.firstName} ${employee.lastName}`}
				</p>
			</li>
		);
	});

	const loading = (
		<li>
			<p className="list-item">Loading...</p>
		</li>
	);

	return (
		<aside className="employees-section">
			<h3>Employees:</h3>
			<ul className="list">
				{(employees?.length && employeesList) || loading}
			</ul>
		</aside>
	);
};

function countOccurrences(schedule: CompleteSchedule, id: string): number {
	let counter = 0;
	for (const station in schedule.schedules) {
		if (Object.prototype.hasOwnProperty.call(schedule.schedules, station)) {
			const stationSchedule = schedule.schedules[station];
			for (const employee of stationSchedule) {
				if (employee?.id === id) counter++;
			}
		}
	}
	return counter;
}

function returnFontColor(counter: number): string {
	if (counter < 3) return 'inherit';
	else if (counter > 3) return 'hsl(0, 94%, 34%)';
	else return '#0F00CA';
}
