import React from 'react';
import { UserProvider } from '../../context/userContext';
import { EmployeesProvider } from '../../context/employeesContext';
import '../../WinBox/winBox.css';
import './App.css';
import '../../fontello/css/styles.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoggedUsersRoute } from '../../RouteTypes/LoggedUsersRoute';
import { NonLoggedUsersRoute } from '../../RouteTypes/NonLoggedUsersRoute';
import { AdminRoute } from '../../RouteTypes/AdminRoute';
import { Schedules } from '../schedules/Schedules';
import { LandingPage } from '../landingPage/LandingPage';
import { HomePage } from '../homePage/HomePage';
import { Create } from '../create/Create';
import { NotFound } from '../notFound/NotFound';

const App: React.FunctionComponent = () => {
	return (
		<UserProvider>
			<EmployeesProvider>
				<BrowserRouter>
					<Switch>
						<NonLoggedUsersRoute path="/" exact component={LandingPage} />
						<LoggedUsersRoute path="/schedules" exact component={Schedules} />
						<LoggedUsersRoute path="/home" exact component={HomePage} />
						<AdminRoute path="/create" component={Create} />
						<Route path="/" component={NotFound} />
					</Switch>
				</BrowserRouter>
			</EmployeesProvider>
		</UserProvider>
	);
};

export default App;
