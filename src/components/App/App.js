import './App.css';
import Tables from '../Tables/Tables';
import Employees from '../Employees/Employees';
import React from 'react';
import { EmployeesProvider } from '../../context/employeesContext';

function App() {
	return (
		<EmployeesProvider>
			<div className="App">
				<Employees />
				<Tables />
			</div>
		</EmployeesProvider>
	);
}

export default App;
