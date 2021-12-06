import React from 'react';
import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { useUser } from 'providers/UserContext';

const App: React.FunctionComponent = () => {
	const { user } = useUser();

	return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
