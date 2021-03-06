import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { EmployeesProvider } from './EmployeesContext';
import { ScrollTopButton } from 'components/scrollTopButton/ScrollTopButton';

export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<BrowserRouter>
			<UserProvider>
				<EmployeesProvider>
					{children}
					<ScrollTopButton />
				</EmployeesProvider>
			</UserProvider>
		</BrowserRouter>
	);
};
