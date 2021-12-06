import { Route, Navigate } from 'react-router-dom';
import { useUser } from 'providers/UserContext';
import { errorMessage } from 'WinBox/winboxMessages';
import Utilities from 'util/Utilities';
import { RoutingProperties } from 'types';

export const AdminRoute = ({
	component: Component,
	path,
}: RoutingProperties) => {
	const { user } = useUser();

	if (Utilities.checkIfUserIsAdmin(user))
		return <Route path={path} element={<Component />} />;
	else if (user) {
		setTimeout(() => {
			errorMessage(
				'Access denied!',
				'You are not authorized to visit this section!',
				170
			);
		}, 1);
		return <Navigate to={{ pathname: '/home' }} />;
	} else {
		setTimeout(() => {
			errorMessage('Access denied!', 'You must be logged to access this page!');
		}, 1);
		return <Navigate to={{ pathname: '/' }} />;
	}
};
