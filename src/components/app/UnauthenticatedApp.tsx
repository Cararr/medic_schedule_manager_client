import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from 'components/landingPage/LandingPage';

export const UnauthenticatedApp: React.FunctionComponent = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<LandingPage />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};
