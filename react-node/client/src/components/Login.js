import "../App.css"
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { UseAuthentication } from '../util/AuthenticateUser';
function Login (){
	const auth = UseAuthentication();
	const navigate = useNavigate();
	const [isValid,setIsValid] = useState({pass:false,user:false});
	const [errorMessage,setErrorMessage] = useState("");
	const [pass,setPass] = useState("");
	const [user,setUser] = useState("");
	const [viewHeight,viewHeightSet] = useState({margin:10,height:300});
	const change={
		user:function(e){
			setUser(e.target.value);
			setIsValid((prev)=>{
				return {
					...prev,
					user:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
				};
			});
		},
		pass:function(e){
			setPass(e.target.value);
			setIsValid((prev)=>{
				return {
					...prev,
					pass:e.target.value!=null && e.target.value.trim().length>5
				};
			});
		}
	};
	const submit=()=>{
		axios.post("http://localhost:3001",{
			password:pass,
			username:user
		})
		.then((res)=>{
			console.log("Returned: ",res.data);
			if(res.data.status ===true){
				console.log("setting nav from:",auth.user);
				auth.login(true);
				console.log("set nav to:",auth.user);
				navigate(res.data.url);
			}
			else
				setErrorMessage(res.data.message);
		})
		.catch((err)=>setErrorMessage(err.status+": "+err.message));
	};
	
	useEffect(()=>{
		viewHeightSet(()=>{
			let retVal = {
				margin:10,
				height:300
			};
			retVal.margin = window.innerHeight*0.1;
			retVal.height = window.innerHeight - retVal.margin*2;
			retVal.margin += 'px';
			retVal.height += 'px';
			return retVal;
		});
		document.title="Login";
	},[]);
    return (<Grid container paddingTop={viewHeight.margin} justifyContent="center" alignItems="center">
		<Grid item xs={1} md={2} lg={3}></Grid>
		<Grid item xs={10} md={8} lg={6}>
			<Box sx={{
				height:viewHeight.height,
				border: '1px solid gray'
			}}>
				<form style={{paddingRight:'10px'}}>
					<h1 style={{textAlign:"center"}}>Login</h1>
					<Grid container rowSpacing={2} >
						<Grid item xs={1} md={2} lg={2}></Grid>
						<Grid item xs={10} md={8} lg={8}>
							<TextField sx={{width:"100%"}} value={user} onChange={change.user} label="Username" name="username" id="username" required/>
						</Grid>
						<Grid item xs={1} md={2} lg={2}></Grid>
						<Grid item xs={1} md={2} lg={2}></Grid>
						<Grid item xs={10} md={8} lg={8}>
							<TextField sx={{width:"100%"}} value={pass} onChange={change.pass} label="Password" name="password" type="password" id="password" required/>
						</Grid>
						<Grid item xs={1} md={2} lg={2}></Grid>
						<Grid item xs={2} md={4} lg={4}></Grid>
						<Grid item xs={8} md={6} lg={6}>
							<Button sx={{width:"100%"}} disabled={isValid.user && isValid.pass ? false : true} onClick={submit} variant="contained">Login</Button>
						</Grid>
						<Grid item xs={12} md={12} lg={12} sx={{display:errorMessage==="" ? "none" : "initial"}}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Grid>
		<Grid item xs={1} md={2} lg={3}></Grid>
	</Grid>);
}
  
export default Login;