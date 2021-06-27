import React, { useState, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { Employee } from '../types';

const UserContext = React.createContext<Employee | null>(null);
const ChangeUserContext = React.createContext<
	(newUser?: Employee | null) => void
>((newUser) => {});

export const useUser = () => useContext(UserContext);
export const useChangeUser = () => useContext(ChangeUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const currentUser = Cookies.get('user')
		? JSON.parse(Cookies.get('user') || '')
		: null;

	const [user, setUser] = useState(currentUser);

	const changeUser = (newUser: Employee | null = null) => setUser(newUser);

	return (
		<UserContext.Provider value={user}>
			<ChangeUserContext.Provider value={changeUser}>
				{children}
			</ChangeUserContext.Provider>
		</UserContext.Provider>
	);
};
