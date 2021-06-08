import React from 'react';
import { UserProvider } from '../../context/userContext';
import { EmployeesProvider } from '../../context/employeesContext';
import './App.css';
import Schedule from '../Schedule/Schedule.jsx';
import LandingPage from '../LandingPage/LandingPage.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<UserProvider>
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
		</UserProvider>
	);
}

export default App;
