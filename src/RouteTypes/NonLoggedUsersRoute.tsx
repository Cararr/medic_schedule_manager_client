import { Route, Navigate } from 'react-router-dom';
import { useUser } from 'providers/UserContext';
import { RoutingProperties } from 'types';

export const NonLoggedUsersRoute = ({
	component: Component,
	path,
}: RoutingProperties) => {
	const { user } = useUser();
	return (
		<Route
			path={path}
			element={!user ? <Component /> : <Navigate to={{ pathname: '/home' }} />}
		/>
	);
};
