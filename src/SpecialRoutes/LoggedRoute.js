import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { accessDeniedWarning } from '../WinBox/winboxMessages';

export default function LoggedRoute({ component: Component, ...rest }) {
	const user = useUser();
	return (
		<Route
			{...rest}
			render={(props) => {
				if (user) return <Component {...props} />;
				else {
					setTimeout(() => {
						accessDeniedWarning('You must be logged to access this page!');
					}, 1);
					return <Redirect to={{ pathname: '/' }} />;
				}
			}}
		/>
	);
}
