import { Route, Redirect } from 'react-router-dom';
import { useUser } from 'providers/UserContext';
import { errorMessage } from 'WinBox/winboxMessages';
import Utilities from 'util/Utilities';
import { RoutingProperties } from 'types';

export const AdminRoute = ({
	component: Component,
	...rest
}: RoutingProperties) => {
	const { user } = useUser();
	return (
		<Route
			{...rest}
			render={(props) => {
				if (Utilities.checkIfUserIsAdmin(user)) return <Component {...props} />;
				else if (user) {
					setTimeout(() => {
						errorMessage(
							'Access denied!',
							'You are not authorized to visit this section!',
							170
						);
					}, 1);
					return <Redirect to={{ pathname: '/home' }} />;
				} else {
					setTimeout(() => {
						errorMessage(
							'Access denied!',
							'You must be logged to access this page!'
						);
					}, 1);
					return <Redirect to={{ pathname: '/' }} />;
				}
			}}
		/>
	);
};
