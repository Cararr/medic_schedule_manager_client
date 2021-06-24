import React, { useState, useContext, useEffect } from 'react';
import { getEmployees } from '../util/get';

const EmployeesContext = React.createContext([]);
const LoadEmployeesContext = React.createContext(() => {});

export const useEmployees = () => useContext(EmployeesContext);
export const useLoadEmployees = () => useContext(LoadEmployeesContext);

export const EmployeesProvider = ({ children }) => {
	const [employees, setEmployees] = useState([]);
	const loadEmployees = async () => {
		setEmployees(await getEmployees());
	};

	useEffect(() => {
		getEmployees().then((employeesList) => {
			if (employeesList) setEmployees(employeesList.sort(sortByLastNameAlphabetically));
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

function sortByLastNameAlphabetically(a, b) {
	if (a.lastName < b.lastName) {
		return -1;
	}
	if (a.lastName > b.lastName) {
		return 1;
	}
	return 0;
}