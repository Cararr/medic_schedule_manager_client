import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../context/userContext';

export default function LandingRoute({ component: Component, ...rest }) {
	const user = useUser();
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
}
