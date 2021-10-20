import React from 'react';
import { AppProviders } from '../../providers/AppProviders';
import { Route } from 'react-router-dom';
import { LoggedUsersRoute } from '../../RouteTypes/LoggedUsersRoute';
import { NonLoggedUsersRoute } from '../../RouteTypes/NonLoggedUsersRoute';
import { AdminRoute } from '../../RouteTypes/AdminRoute';
import { ViewSchedules } from '../schedulesView/ViewSchedules';
import './App.css';
import { LandingPage } from '../landingPage/LandingPage';
import { HomePage } from '../homePage/HomePage';
import { Create } from '../create/Create';
import { Vacations } from '../vacations/Vacations';
import { NotFound } from '../notFound/NotFound';
import '../../WinBox/winBox.css';

const App: React.FunctionComponent = () => {
	return (
		<AppProviders>
			<NonLoggedUsersRoute path="/" exact component={LandingPage} />
			<NonLoggedUsersRoute path="/login" exact component={LandingPage} />
			<LoggedUsersRoute path="/schedules" exact component={ViewSchedules} />
			<LoggedUsersRoute path="/home" exact component={HomePage} />
			<LoggedUsersRoute path="/vacations" exact component={Vacations} />
			<AdminRoute path="/create" component={Create} />
			<Route path="/" component={NotFound} />
		</AppProviders>
	);
};

export default App;
