// import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Login from './components/Login';
import HrDashboard from './components/HrDashboard';
import {AuthenticateUser} from './util/AuthenticateUser';
import {RequireAuthorisation} from './util/RequireAuthorisation';

function App() {
  return (
	<AuthenticateUser>
		<Router>
			<Routes>
				<Route path='/' element={< Login />} />
				<Route path='hrDashboard' element={ 
					<RequireAuthorisation>
						<HrDashboard/>
					</RequireAuthorisation>
				} />
			</Routes>
		</Router>
	</AuthenticateUser>
  );
}

export default App;
