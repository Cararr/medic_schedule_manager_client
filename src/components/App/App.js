import React from 'react';
import { EmployeesProvider } from '../../context/employeesContext';
import './App.css';
import Schedule from '../Schedule/Schedule';

function App() {
	return (
		<EmployeesProvider>
			<Schedule />
		</EmployeesProvider>
	);
}

export default App;
