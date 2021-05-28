import React from 'react';
import { EmployeesProvider } from '../../context/employeesContext';
import './App.css';
import Schedule from '../Schedule/Schedule';
import LandingPage from '../LandingPage/LandingPage';

function App() {
	return (
		<EmployeesProvider>
			<LandingPage />
			{/* <Schedule /> */}
		</EmployeesProvider>
	);
}

export default App;
