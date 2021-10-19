import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { RoutingProperties } from '../types';

export const NonLoggedUsersRoute = ({
	component: Component,
	...rest
}: RoutingProperties) => {
	const { user } = useUser();
	return (
		<Route
			{...rest}
			render={(props) => {
				return !user ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/home' }} />
				);
			}}
		/>
	);
};
