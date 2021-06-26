import React, { useState, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface UserCrudentials {
	lastName: string;
	password: string;
}

const UserContext = React.createContext(null);
const ChangeUserContext = React.createContext(
	({ lastName, password }: UserCrudentials) => {}
);

export const useUser = () => useContext(UserContext);
export const useChangeUser = () => useContext(ChangeUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const currentUser = Cookies.get('user')
		? JSON.parse(Cookies.get('user'))
		: null;
	const [user, setUser] = useState(currentUser);
	const changeUser = (newUser = null) => setUser(newUser);

	return (
		<UserContext.Provider value={user}>
			<ChangeUserContext.Provider value={changeUser}>
				{children}
			</ChangeUserContext.Provider>
		</UserContext.Provider>
	);
};
