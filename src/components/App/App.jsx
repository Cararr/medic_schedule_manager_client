import React from 'react';
import { UserProvider } from '../../context/userContext';
import { EmployeesProvider } from '../../context/employeesContext';
import '../../WinBox/winBox.css';
import './App.css';
import '../../fontello/css/fontello.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../../SpecialRoutes/ProtectedRoute';
import NonLoggedRoute from '../../SpecialRoutes/NonLoggedRoute';
import Schedule from '../Schedule/Schedule.jsx';
import LandingPage from '../LandingPage/LandingPage.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import NotFound from '../NotFound/NotFound.jsx';

function App() {
	return (
		<UserProvider>
			<EmployeesProvider>
				<BrowserRouter>
					<Switch>
						<NonLoggedRoute path="/" exact component={LandingPage} />
						<ProtectedRoute path="/schedule" exact component={Schedule} />
						<ProtectedRoute path="/home" exact component={HomePage} />
						<Route path="/" component={NotFound} />
					</Switch>
				</BrowserRouter>
			</EmployeesProvider>
		</UserProvider>
	);
}

export default App;
