import React from 'react';
import { EmployeesProvider } from '../../context/employeesContext';
import './App.css';
import Schedule from '../Schedule/Schedule';
import LandingPage from '../LandingPage/LandingPage';
import HomePage from '../HomePage/HomePage';
import NotFound from '../NotFound/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<EmployeesProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/schedule" exact component={Schedule} />
					<Route path="/home" exact component={HomePage} />
					<Route path="/" component={NotFound} />
				</Switch>
			</BrowserRouter>
		</EmployeesProvider>
	);
}

export default App;
