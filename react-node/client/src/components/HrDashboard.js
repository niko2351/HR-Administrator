import React, {useState, useEffect} from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import { UseAuthentication } from '../util/AuthenticateUser';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import ListEmployees from './ListEmployees';
import EditEmployee from './EditEmployee';
import CreateEmployee from './CreateEmployee';
import ListDepartments from './ListDepartments';
import EditDepartment from './EditDepartment';
import CreateDepartment from './CreateDepartment';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function HrDashboard({children}){
	const auth = UseAuthentication();
	const navigate = useNavigate();
	const [menuBar,setMenuBar] = useState(false);
	const [activeTab,setActiveTab] = useState(0);
	const [listDepartments,setListDepartments] = useState([]);
	const [listEmployees,setListEmployees] = useState([]);
	const [editEmployee,setEditEmployee] = useState({
		status:false,
		manager:"",
		department:"",
		telephoneNumber:"",
		id:"",
		email:"",
		lastName:"",
		firstName:""
	});
	const [editDepartment,setEditDepartment] = useState({
		status:false,
		manager:"",
		id:"",
		name:""
	});
	const expandMenu =()=>{
		setMenuBar((prev)=>!prev);
	};
	const logout = ()=>{
		auth.logout();
		navigate("/",{replace:true});
	};
	const menuItems = [{
		id:0,
		showInMenu:true,
		label:"Employees",
		contents:<ListEmployees list={{employee:listEmployees,department:listDepartments}} delete={(v)=>{
			if(v!=null)
				setListEmployees(listEmployees.filter(curr=>curr.id!==v.id))
		}} edit={(v)=>{
			setEditEmployee(v);
			setActiveTab(4);
		}} />
	},{
		id:1,
		showInMenu:true,
		label:"Employee Create",
		contents:<CreateEmployee list={listEmployees} add={(v)=>{
			if(v!=null)
				setListEmployees((prev)=>{
					return [ ...prev, v]
				});
		}} />
	},{
		id:3,
		showInMenu:true,
		label:"Departments",
		contents:<ListDepartments list={{department:listDepartments,employee:listEmployees}}  delete={(v)=>{
			if(v!=null)
				setListDepartments(listDepartments.filter(curr=>curr.id!==v.id))
		}} edit={(v)=>{
			setEditDepartment(v);
			setActiveTab(5);
		}} />
	},{
		id:2,
		showInMenu:true,
		label:"Department Create",
		contents:<CreateDepartment list={listEmployees} add={(v)=>{
			if(v!=null)
				setListDepartments( (prev) => {return [...prev,v]});
		}} />
	},{
		id:4,
		showInMenu:false,
		label:"Employee Edit",
		contents:<EditEmployee value={editEmployee} list={{department:listDepartments,employee:listEmployees}} back={(v)=>{
			if(v!=null)
				setListEmployees(()=>{
					listEmployees.map((curr)=>{
						if(v.id===curr.id)
							return v;
						return curr;
					})
				})
			setEditEmployee(null);
			setActiveTab(0);
		}} delete={(v)=>{
			if(v!=null)
				setListEmployees(()=>listEmployees.filter(curr => curr.id!==v.id));
			setEditEmployee(null);
			setActiveTab(0);
		}}/>
	},{
		id:5,
		showInMenu:false,
		label:"Department Edit",
		contents:<EditDepartment value={editDepartment} list={listEmployees} back={(v)=>{
			if(v!=null)
				setListDepartments(() =>{
					listDepartments.map((curr)=>{
						if(v.id===curr.id)
							return v;
						return curr;
					})
				})
			setEditDepartment(null);
			setActiveTab(5);
		}} delete={(v)=>{
			if(v!=null)
				setListDepartments(()=>listDepartments.filter(curr => curr.id!==v.id));
			setEditDepartment(null);
			setActiveTab(5);
		}}/>
	}];
	axios.get("http://localhost:3001/list")
	.then((res)=>{
		setListEmployees(res.data.employee);
		setListDepartments(res.data.department);
	})
	.catch((err)=>alert(err.message));
	useEffect(()=>{
		document.title="HR Admin";
	},[]);
	
    return (<div>
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={expandMenu}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>HR Administration System</Typography>
				</Toolbar>
			</AppBar>
			<Grid container>
				<Grid item xs={2} sm={2} md={ menuBar ? 2:0} lg={ menuBar ? 2:0}>
					<List sx={{color:"white",backgroundColor:"blue",display: (menuBar ? "inherit" : "none")}}>
						{
							menuItems.filter(v=>v.showInMenu)
							.map((v,i)=>{
								return (<ListItemButton key={i} onClick={()=>{setActiveTab(v.id);setMenuBar(false)}}>
									<ListItemText primary={v.label} />
								</ListItemButton>)
							})
						}
						<Divider variant="middle" sx={{backgroundColor:"white"}} component="li" />
						<ListItemButton onClick={logout}>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</List>
				</Grid>
				<Grid item xs={10} sm={10} md={ menuBar ? 10: 12} lg={ menuBar ? 10:12} sx={{padding:'5px'}}>
					{
						menuItems.map((v,i)=>{
							return (<TabPanel value={activeTab} index={v.id} key={i}>
								{ v.contents }
							</TabPanel>)
						})
					}
				</Grid>
			</Grid>
		</Box>
    </div>)
}

export default HrDashboard;