import {useState} from "react";
import "../App.css";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CreateDepartment = (props)=>{
	const [disableForm,setDisableForm] = useState(false);
	const [name,setName] = useState("");
	const [manager,setManager] = useState("");
	
	const save = (e)=>{
		e.preventDefault();
		setDisableForm(true);
		axios.post("http://localhost:3001/department/create",{
			name,
			manager
		})
		.then((res)=>{
			console.log("Returned: ",res.data);
			if(res.data.status ===true){
				props.add({
					name,
					manager,
					id:res.data.new.id,
					status:res.data.new.status
				});
				setName("");
				setManager("");
			}
			setDisableForm(false);
		})
		.catch((err)=>{
			alert("Error",err.message);
			setDisableForm(false);
		});
	};
	
	return (<>
		<h1 style={{textAlign:"center"}}>Create Department</h1>
		{
			props.list.filter( v => v.manager=="").length>0 ? <form onSubmit={save}>
				<Grid container rowSpacing={1}>
					<Grid item xs={3}>
						<label style={{textAlign:"right"}} className="required">Name</label>
					</Grid>
					<Grid item xs={6}>
						<input className="full-width" required value={name} onChange={(e)=>setName(e.target.value)} readonly={disableForm} />
					</Grid>
					<Grid item xs={3}/>
					<Grid item xs={3}>
						<label style={{textAlign:"right"}} className="required">Manager</label>
					</Grid>
					<Grid item xs={6}>
						<Select className="full-width" required onChange={(e)=>setManager(e.target.value)} readonly={disableForm}>
							{
								props.list.filter( v => v.manager=="").map((v,i)=>{
									return <MenuItem key={i} value={v.id}>
										{v.firstName +" "+v.lastName}
									</MenuItem>
								})
							}
						</Select>
					</Grid>
					<Grid item xs={3} />
					<Grid item xs={6} />
					<Grid item xs={6}>
						<Button variant="contained" type="submit" color="success">Save</Button>
					</Grid>
				</Grid>
			</form>
			: <p style={{textAlign:"center"}}>You cannot create a department without any managers</p> 
		}
	</>)

}
export default CreateDepartment