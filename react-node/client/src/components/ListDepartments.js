import {useState, useEffect} from "react"
import "../App.css"
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const ListDepartments = (props)=>{
	const [search,setSearch] = useState("");
	const [rowsPerPage,setRowsPerPage] = useState(5);
	const [currentPage,setCurrentPage] = useState(0);

	const [expandFilter,setExpandFilter] = useState(false);
	const [statusFilter,setStatusFilter] = useState(0);
	const [showPerPageFilter,setShowPerPageFilter] = useState(-1);

	const deleteDept = (v)=>{
		axios.post("http://localhost:3001/department/delete",{
			id:v.id
		})
		.then((res)=>{
			console.log("Returned: ",res.data);
			if(res.data.status ===true)
				props.delete({
					id:v.id
				});
		})
		.catch((err)=>{
			alert("Error",err);
		});
	};
	const handleChangeRowsPerPage = (e,v)=>{
		setRowsPerPage(parseInt(e ? e.target.value : v,10));
		handleChangePage(null,0);
	};
	const handleChangePage = (e,v)=>{
		setCurrentPage(v);
	};

	return (<>
		<h1 style={{textAlign:"center"}}>Departments</h1>
		{
			props.list.employee.length>0 ? <>
				<Card>
					<CardHeader title="Filter" action={
						<IconButton onClick={()=>setExpandFilter(!expandFilter)}>
							{
								!expandFilter ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>
							}
						</IconButton>
					} />
					<Collapse in={expandFilter}>
						<Grid container rowSpacing={1}>
							<Grid item xs={2} md={2} lg={2} />
							<Grid item xs={2} md={3} lg={3} >
								<label>Status</label>
							</Grid>
							<Grid item xs={6} md={5} lg={5} >
								<Select className="full-width" value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
									<MenuItem value={0}>All</MenuItem>
									<MenuItem value={1}>Active</MenuItem>
									<MenuItem value={2}>Deactive</MenuItem>
								</Select>
							</Grid>
							<Grid item xs={2} md={2} lg={2} />
						</Grid>
					</Collapse>
				</Card>
				<TableContainer>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Actions</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Manager</TableCell>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								props.list.department.filter((v) =>{ return statusFilter===0 || statusFilter===1 && v.status || statusFilter===2 && !v.status;}) /* filter for the status */
								.map((v,i)=>{
									let row={
										manager:{
											id:v.manager,
											name:""
										},
										status:v.status,
										name:v.name
									};
									for(let obj of props.list.employee){
										if(v.manager==obj.id){
											row.manager.name=obj.firsName+" "+obj.lastName;
											break;
										}
									}
									return <TableRow key={i}>
										<TableCell>
											<Button variant="contained" onClick={()=>props.edit(v)}>Edit</Button>
											<Button variant="contained" onClick={()=>deleteDept(v)}>Delete</Button>
										</TableCell>
										<TableCell>{ row.name }</TableCell>
										<TableCell>{ row.manager.name }</TableCell>
										<TableCell>{ row.status ? "Active" : "Inactive"}</TableCell>
									</TableRow>
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5,10, 20, 50,100,{value:-1,label:"All"}]}
					component="div"
					count={
						props.list.department
						.filter((v) =>{ return statusFilter===0 || statusFilter===1 && v.status || statusFilter===2 && !v.status;})
						.length
					}
					rowsPerPage={rowsPerPage}
					page={currentPage}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</> : <p style={{textAlign:"center"}}>There are currently no departments</p>
		}
	</>)
}

export default ListDepartments