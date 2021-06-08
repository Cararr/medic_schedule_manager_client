import React, { useState, useContext, useEffect } from 'react';
import { getEmployees } from '../util/fetchFromDB';

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
			if (employeesList) setEmployees(employeesList);
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
