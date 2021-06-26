import React from 'react';
import { UserProvider } from '../../context/userContext';
import { EmployeesProvider } from '../../context/employeesContext';
import '../../WinBox/winBox.css';
import './App.css';
import '../../fontello/css/styles.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoggedRoute from '../../RouteTypes/LoggedRoute';
import NonLoggedRoute from '../../RouteTypes/NonLoggedRoute';
import AdminRoute from '../../RouteTypes/AdminRoute';
import Schedules from '../schedules/Schedules';
import LandingPage from '../landingPage/LandingPage';
import HomePage from '../homePage/HomePage';
import Create from '../create/Create';
import NotFound from '../notFound/NotFound';

const App: React.FC = () => {
	return (
		<UserProvider>
			<EmployeesProvider>
				<BrowserRouter>
					<Switch>
						<NonLoggedRoute path="/" exact component={LandingPage} />
						<LoggedRoute path="/schedules" exact component={Schedules} />
						<LoggedRoute path="/home" exact component={HomePage} />
						<AdminRoute path="/create" component={Create} />
						<Route path="/" component={NotFound} />
					</Switch>
				</BrowserRouter>
			</EmployeesProvider>
		</UserProvider>
	);
};

export default App;