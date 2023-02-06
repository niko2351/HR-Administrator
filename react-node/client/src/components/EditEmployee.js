import {useState} from "react";
import "../App.css";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const EditEmployee = (props)=>{
	const [disableForm,setDisableForm] = useState(false);
	const [firstName,setFirstName] = useState(props.value.firstName);
	const [lastName,setLastName] = useState(props.value.lastName);
	const [telephoneNumber,setTelephoneNumber] = useState(props.value.telephoneNumber);
	const [email,setEmail] = useState(props.value.email);
	const [department,setDepartment] = useState(props.value.department);
	const [manager,setManager] = useState(props.value.manager);
	const [status,setStatus] = useState(props.value.status);

	const deleteEmp = ()=>{
		setDisableForm(true);
		axios.post("http://localhost:3001/employee/delete",{
			id:props.value.id
		})
		.then((res)=>{
			console.log("Returned: ",res.data);
			if(res.data.status ===true)
				props.delete({
					id:res.data.id
				});
		})
		.catch((err)=>{
			setDisableForm(false);
			alert("Error",err);
		});
	};
	const cancel = (e)=>{
		props.back();
	}
	const save = (e)=>{
		e.preventDefault();
		setDisableForm(true);
		let _manager="";
		if(manager!=-1){
			for(let obj of props.list){
				if(obj.manager===""){
					_manager=obj.id;
					break;
				}
			}
		}
		axios.post("http://localhost:3001/employee/edit",{
			id:props.value.id,
			firstName,
			status,
			lastName,
			telephoneNumber,
			department,
			email,
			manager:_manager
		})
		.then((res)=>{
			console.log("Returned: ",res.data);
			if(res.data.status ===true)
				props.back({
					firstName,
					lastName,
					telephoneNumber,
					status:res.data.status,
					email,
					manager:_manager
				})
		})
		.catch((err)=>{
			alert("Error",err);
			setDisableForm(false);
		});
	};

	return (<>
		<h1>Create Employee</h1>
		<form onSubmit={save}>
			<Grid container rowSpacing={1}>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Full Name(s)</label></Grid>
				<Grid item xs={9} md={9} lg={9}> <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="full-width" readonly={disableForm} required/></Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Last Name</label></Grid>
				<Grid item xs={9} md={9} lg={9}> <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="full-width" readonly={disableForm} required/></Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Telephone Number</label></Grid>
				<Grid item xs={9} md={9} lg={9}> <input type="text" value={telephoneNumber} onChange={(e)=>setTelephoneNumber(e.target.value)} className="full-width" readonly={disableForm} required/></Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Email</label></Grid>
				<Grid item xs={9} md={9} lg={9}> <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="full-width" readonly={disableForm} required/></Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Manager</label></Grid>
				<Grid item xs={9} md={9} lg={9}>
					<Select value={manager} onChange={(e)=>setManager(e.target.value)} className="full-width" readonly={disableForm}>
						<MenuItem value="">Employee Is The Manager</MenuItem>
						{
							props.list.employee.length>0?
							props.list.employee.filter(v => v.manager=="")
							.map((v,i)=>{
								return <MenuItem key={i} value={v.id}>
									{ v.name }
								</MenuItem>
							}):<></>
						}
					</Select>
				</Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Department</label></Grid>
				<Grid item xs={9} md={9} lg={9}>
					<Select value={department} onChange={(e)=>setDepartment(e.target.value)} className="full-width" readonly={disableForm} required>
						{
							props.list.department.map((v,i)=>{
								return <MenuItem key={i} value={v.id}>
									{ v.name }
								</MenuItem>
							})
						}
					</Select>
				</Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Status</label></Grid>
				<Grid item xs={9} md={9} lg={9}>
					<Select value={status} onChange={(e)=>setStatus(e.target.value)} className="full-width" readonly={disableForm}>
						<MenuItem value={true}>Active</MenuItem>
						<MenuItem value={false}>Deactive</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={6} md={6} lg={6} />
				<Grid item xs={6} md={6} lg={6}>
					<Button variant="contained" color="success" type="submit">Save</Button>
					<Button variant="contained" color="warning" onClick={deleteEmp}>Delete</Button>
					<Button variant="contained" color="error" onClick={cancel}>Cancel</Button>
				</Grid>
			</Grid>
		</form>
	</>)

}

export default EditEmployee