import {useState,createContext, useContext} from 'react';

const AuthorisationContext = createContext(null);
export const AuthenticateUser =({children})=>{
	const [user,setUser] = useState(null);
	const login = (user)=>{
		setUser(user);
	};
	const logout = ()=>{
		setUser(null);
	};
	
	return (<AuthorisationContext.Provider value={{login,logout,user}}>
		{children}
	</AuthorisationContext.Provider>);
}

export const UseAuthentication = ()=>{
	return useContext(AuthorisationContext);
}