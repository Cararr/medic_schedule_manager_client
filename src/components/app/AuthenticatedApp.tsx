import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from 'components/homePage/HomePage';
import { ViewSchedules } from 'components/schedules/ViewSchedules';
import { Vacations } from 'components/vacations/Vacations';
import { Create } from 'components/create/Create';
import { CreateSchedules } from 'components/schedules/CreateSchedules';
import { CreateVacation } from 'components/create/CreateVacation';
import { CreateHomeRehabilitation } from 'components/create/CreateHomeRehabilitation';
import { NotFound } from 'components/notFound/NotFound';
import { useUser } from 'providers/UserContext';
import Utilities from 'util/Utilities';
import { NavBar } from 'components/navBar/NavBar';

export const AuthenticatedApp: React.FunctionComponent = () => {
	const isUserBoss = Utilities.checkIfUserIsAdmin(useUser().user);

	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="login" element={<Navigate to="/home" />} />
				<Route path="home" element={<HomePage />} />
				<Route path="schedules" element={<ViewSchedules />} />
				<Route path="vacations" element={<Vacations />} />
				<Route
					path="create"
					element={isUserBoss ? <Create /> : <Navigate to="/" />}
				>
					<Route path="schedules" element={<CreateSchedules />} />
					<Route path="vacations" element={<CreateVacation />} />
					<Route
						path="home-rehabilitations"
						element={<CreateHomeRehabilitation />}
					/>
				</Route>
				<Route path="404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</>
	);
};
