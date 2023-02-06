import {useState} from "react";
import "../App.css";
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const EditDepartment = (props)=>{
	const [disableForm,setDisableForm] = useState(false);
	const [name,setName] = useState(props.value.name);
	const [manager,setManager] = useState(props.value.manager);
	const [status,setStatus] = useState(props.value.status);

	const save = (e)=>{
		e.preventDefault();
		setDisableForm(true);
		axios.post("http://localhost:3001/department/edit",{
			name,
			manager,
			status
		})
		.then((res)=>{
			console.log("Returned: ",res.data);
			if(res.data.status ===true)
				props.back({
					name,
					manager,
					status
				});
		})
		.catch((err)=>{
			setDisableForm(false);
			alert("Error",err);
		});
	};
	const cancel = ()=>{
		props.back();
	};

	return (<>
		<h1 style={{textAlign:"center"}}>Edit Department</h1>
		<form onSubmit={save}>
			<Box>
			<Grid container rowSpacing={1}>
				<Grid item xs={3}>
					<label className="required">Name</label>
				</Grid>
				<Grid item xs={9}>
					<input required value={name} className="full-width" onChange={(e)=>setName(e.target.value)} readonly={disableForm} />
				</Grid>
				<Grid item xs={3}>
					<label className="required">Manager</label>
				</Grid>
				<Grid item xs={9}>
					<Select value={manager} className="full-width" required onChange={(e)=>setManager(e.target.value)} readonly={disableForm}>
						{
							props.list.filter( v => v.manager=="").map((v,i)=>{
								return <MenuItem key={i} value={v.id}>
									{v.firstName +" "+v.lastName}
								</MenuItem>
							})
						}
					</Select>
				</Grid>
				<Grid item xs={3}>
					<label className="required">Status</label>
				</Grid>
				<Grid item xs={9}>
					<Select value={status} className="full-width" required onChange={(e)=>setStatus(e.target.value)} readonly={disableForm}>
						<MenuItem value={true}>Activate</MenuItem>
						<MenuItem value={false}>Deactivate</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<Button variant="contained" type="submit" color="success">Save</Button>
					<Button variant="contained" onClick={cancel} color="error">Cancel</Button>
				</Grid>
			</Grid>
			</Box>
		</form>
	</>)
}

export default EditDepartment