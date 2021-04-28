import React, { useState, useEffect, useContext } from 'react';
import { loadEmployees } from '../util/fetchFromDB';

const EmployeesContext = React.createContext([]);

export const useEmployees = () => useContext(EmployeesContext);

export const EmployeesProvider = ({ children }) => {
	const [employees, setEmployees] = useState([]);
	useEffect(() => {
		setInitialEmployees();
	}, []);
	const setInitialEmployees = async () => {
		const employeesRepsonse = await loadEmployees();
		setEmployees(employeesRepsonse);
	};

	return (
		<EmployeesContext.Provider value={employees}>
			{children}
		</EmployeesContext.Provider>
	);
};
