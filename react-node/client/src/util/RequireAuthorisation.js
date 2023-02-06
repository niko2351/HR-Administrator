import {UseAuthentication} from './AuthenticateUser';
import {Navigate} from 'react-router-dom';

export const RequireAuthorisation = ({children})=>{
	const auth = UseAuthentication();
	if(!auth.user){
		return <Navigate to='/' />;
	}
	return children
}