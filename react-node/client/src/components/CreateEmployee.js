import {useState, useEffect} from "react";
import "../App.css";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CreateEmployee = (props)=>{
	const [disableForm,setDisableForm] = useState(false);
	const [firstName,setFirstName] = useState("");
	const [lastName,setLastName] = useState("");
	const [telephoneNumber,setTelephoneNumber] = useState("");
	const [email,setEmail] = useState("");
	const [manager,setManager] = useState(-1);

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
		axios.post("http://localhost:3001/employee/create",{
			firstName,
			lastName,
			telephoneNumber,
			email,
			manager:_manager
		})
		.then((res)=>{
			console.log("Returned: ",res.data);
			if(res.data.status ===true){
				props.add({
					firstName,
					lastName,
					telephoneNumber,
					id:res.data.new.id,
					status:res.data.new.status,
					email,
					manager:_manager
				});
				setDisableForm(false);
				setFirstName("");
				setLastName("");
				setEmail("");
				setTelephoneNumber("");
				setManager("");
			}
		})
		.catch((err)=>{
			alert("Error",err.message);
			setDisableForm(false);
		});
	};

	return (<>
		<h1>Create Employee</h1>
		<form>
			<Grid container rowSpacing={1}>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Full Name(s)</label></Grid>
				<Grid item xs={9} md={9} lg={9}> <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="full-width" readonly={disableForm} readonly={disableForm} required/></Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Last Name</label></Grid>
				<Grid item xs={9} md={9} lg={9}> <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="full-width" readonly={disableForm} readonly={disableForm} required/></Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Telephone Number</label></Grid>
				<Grid item xs={9} md={9} lg={9}> <input type="text" value={telephoneNumber} onChange={(e)=>setTelephoneNumber(e.target.value)} className="full-width" readonly={disableForm} readonly={disableForm} required/></Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Email</label></Grid>
				<Grid item xs={9} md={9} lg={9}> <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="full-width" readonly={disableForm} readonly={disableForm} required/></Grid>
				<Grid item xs={3} md={3} lg={3}> <label className="require">Manager</label></Grid>
				<Grid item xs={9} md={9} lg={9}>
					<Select value={manager} onChange={(e)=>setManager(e.target.value)} readonly={disableForm} className="full-width" readonly={disableForm}>
						<MenuItem value="">Employee Is The Manager</MenuItem>
						{
							props.list.filter(v => v.manager!="")
							.map((v,i)=>{
								return <MenuItem key={i} value={v.id}>
									{ v.name }
								</MenuItem>
							})
						}
					</Select>
				</Grid>
				<Grid item xs={6} md={6} lg={6} />
				<Grid item xs={6} md={6} lg={6}>
					<Button variant="contained" color="success" type="submit" onClick={save}>Save</Button>
				</Grid>

			</Grid>
		</form>
	</>)
}

export default CreateEmployee