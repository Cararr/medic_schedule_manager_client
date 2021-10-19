import React, { useState, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { Employee } from '../types';

const UserContext = React.createContext<{
	user: Employee | null;
	changeUser: (newUser?: Employee | null) => void;
}>({ user: null, changeUser: () => {} });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const currentUser = Cookies.get('user')
		? JSON.parse(Cookies.get('user') || '')
		: null;

	const [user, setUser] = useState(currentUser);

	const changeUser = (newUser: Employee | null = null) => setUser(newUser);

	return (
		<UserContext.Provider value={{ user, changeUser }}>
			{children}
		</UserContext.Provider>
	);
};
