import { ReactNode } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { UserProvider } from './userContext';
import { EmployeesProvider } from './employeesContext';
import { ScrollTopButton } from '../components/scrollTopButton/ScrollTopButton';

export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<BrowserRouter>
			<UserProvider>
				<EmployeesProvider>
					<Switch>{children}</Switch>
					<ScrollTopButton />
				</EmployeesProvider>
			</UserProvider>
		</BrowserRouter>
	);
};
