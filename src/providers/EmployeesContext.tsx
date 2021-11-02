import React, { useState, useContext, useEffect, ReactNode } from 'react';
import Get from 'api/Get';
import { Employee } from 'types';
import { useUser } from './UserContext';

const EmployeesContext = React.createContext<{
	employees: Employee[];
	loadEmployees: () => void;
}>({
	employees: [],
	loadEmployees: () => {},
});

export const useEmployees = () => useContext(EmployeesContext);

export const EmployeesProvider = ({ children }: { children: ReactNode }) => {
	const [employees, setEmployees] = useState([]);
	const loadEmployees = async () => {
		setEmployees(await Get.employees());
	};

	const { user } = useUser();

	useEffect(() => {
		if (user)
			Get.employees().then((employeesList) => {
				if (employeesList)
					setEmployees(employeesList.sort(sortByLastNameAlphabetically));
			});
	}, [user]);

	return (
		<EmployeesContext.Provider value={{ employees, loadEmployees }}>
			{children}
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
