import React, { useState, useContext, useEffect, ReactNode } from 'react';
import Get from '../util/api/Get';
import { Employee } from '../types';

const EmployeesContext = React.createContext<Employee[]>([]);
const LoadEmployeesContext = React.createContext(() => {});

export const useEmployees = () => useContext(EmployeesContext);
export const useLoadEmployees = () => useContext(LoadEmployeesContext);

export const EmployeesProvider = ({ children }: { children: ReactNode }) => {
	const [employees, setEmployees] = useState([]);
	const loadEmployees = async () => {
		setEmployees(await Get.employees());
	};

	useEffect(() => {
		Get.employees().then((employeesList) => {
			if (employeesList)
				setEmployees(employeesList.sort(sortByLastNameAlphabetically));
		});
	}, []);

	return (
		<EmployeesContext.Provider value={employees}>
			<LoadEmployeesContext.Provider value={loadEmployees}>
				{children}
			</LoadEmployeesContext.Provider>
		</EmployeesContext.Provider>
	);
};

function sortByLastNameAlphabetically(a: Employee, b: Employee) {
	if (a.lastName < b.lastName) {
		return -1;
	}
	if (a.lastName > b.lastName) {
		return 1;
	}
	return 0;
}
