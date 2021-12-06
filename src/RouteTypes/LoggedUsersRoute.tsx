import { Route, Navigate } from 'react-router-dom';
import { useUser } from 'providers/UserContext';
import { errorMessage } from 'WinBox/winboxMessages';
import { RoutingProperties } from 'types';

export const LoggedUsersRoute = ({
	component: Component,
	path,
}: RoutingProperties) => {
	const { user } = useUser();
	return (
		<Route
			path={path}
			element={user ? <Component /> : <Navigate to={{ pathname: '/login' }} />}
		/>
	);
};
