import React from 'react';
import { AppProviders } from 'providers/AppProviders';
import { Route } from 'react-router-dom';
import { LoggedUsersRoute } from 'RouteTypes/LoggedUsersRoute';
import { NonLoggedUsersRoute } from 'RouteTypes/NonLoggedUsersRoute';
import { AdminRoute } from 'RouteTypes/AdminRoute';
import { ViewSchedules } from 'components/schedulesView/ViewSchedules';
import './App.css';
import { LandingPage } from 'components/landingPage/LandingPage';
import { HomePage } from 'components/homePage/HomePage';
import { Create } from 'components/create/Create';
import { Vacations } from 'components/vacations/Vacations';
import { NotFound } from 'components/notFound/NotFound';
import 'WinBox/winBox.css';

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
