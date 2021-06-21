import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { accessDeniedWarning } from '../WinBox/winboxMessages';
import { Utilities } from '../util/util';

export default function AdminRoute({ component: Component, ...rest }) {
	const user = useUser();
	return (
		<Route
			{...rest}
			render={(props) => {
				if (Utilities.checkIfUserIsAdmin(user)) return <Component {...props} />;
				else if (user) {
					setTimeout(() => {
						accessDeniedWarning(
							'You are not authorized to visit this section.'
						);
					}, 1);
					return <Redirect to={{ pathname: '/home' }} />;
				} else {
					setTimeout(() => {
						accessDeniedWarning('You must be logged to access this page!');
					}, 1);
					return <Redirect to={{ pathname: '/' }} />;
				}
			}}
		/>
	);
}
