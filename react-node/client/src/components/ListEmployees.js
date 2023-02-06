import {useState, useEffect} from "react"
import "../App.css"
import axios from "axios"
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

const ListEmployees = (props)=>{

	const [search,setSearch] = useState("");
	const [rowsPerPage,setRowsPerPage] = useState(5);
	const [currentPage,setCurrentPage] = useState(0);
	
	const [expandFilter,setExpandFilter] = useState(false);
	const [statusFilter,setStatusFilter] = useState(0);
	const [showPerPageFilter,setShowPerPageFilter] = useState(-1);
	const [managerFilter,setManagerFilter] = useState("");
	
	const handleChangeRowsPerPage = (e,v)=>{
		setRowsPerPage(parseInt(e ? e.target.value : v,10));
		handleChangePage(null,0);
	};
	const handleChangePage = (e,v)=>{
		setCurrentPage(v);
	};
	const deleteEmp = (v)=>{
		axios.post("http://localhost:3001/employee/delete",{
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

	return (<>
		<h1 style={{textAlign:"center"}}>Employees</h1>
		{
			props.list.employee.length>0 ? <>
				<Card>
					<CardHeader sx={{textAlign:"center"}} title="Filter" action={
						<IconButton size="sm" onClick={()=>setExpandFilter(!expandFilter)}>
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
							
							<Grid item xs={2} md={2} lg={2} />
							<Grid item xs={2} md={3} lg={3} >
								<label>Manager</label>
							</Grid>
							<Grid item xs={6} md={5} lg={5} >
								<Select className="full-width" disabled={props.list.employee.filter(v=>v.manager==="").length==0} value={managerFilter} onChange={(e)=>setManagerFilter(e.target.value)}>
									<MenuItem value="">All</MenuItem>
									{
										props.list.employee.filter(v=>v.manager=="").map((v,i)=>{
											return <MenuItem key={i} value={v.id}>{v.firstName+" "+v.lastName}</MenuItem>
										})
									}
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
								<TableCell>First Name</TableCell>
								<TableCell>Last Name</TableCell>
								<TableCell>Telephone</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Manager</TableCell>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								props.list.employee.filter((v)=> statusFilter==0 || statusFilter==1 && v.status || statusFilter==2 && !v.status) /* status filter */
								.filter((v)=>managerFilter=="" || v.manager==managerFilter) /* manager filter */
								.map((obj,i)=>{
									let row = {
										id:obj.id,
										manager:{
											id:obj.manager,
											name:""
										},
										department:obj.department,
										status:obj.status,
										email:obj.email,
										telephoneNumber:obj.telephoneNumber,
										lastName:obj.lastName,
										firstName:obj.firstName,
									};
									for(let x of props.list.employee){
										if(obj.manager==x.id){
											row.manager.name = x.firstName+" "+x.lastName;
											break;
										}
									}
									return <TableRow key={i}>
										<TableCell>
											<Button variant="contained" onClick={()=>props.edit(obj)}>Edit</Button>
											<Button variant="contained" onClick={()=>deleteEmp(obj)}>Delete</Button>
										</TableCell>
										<TableCell>{ row.firstName }</TableCell>
										<TableCell>{ row.lastName }</TableCell>
										<TableCell>{ row.telephoneNumber }</TableCell>
										<TableCell>{ row.email }</TableCell>
										<TableCell>{ row.manager.name }</TableCell>
										<TableCell>{ row.status ? "Active" : "Inactive" }</TableCell>
									</TableRow>;
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5,10, 20, 50,100,{value:-1,label:"All"}]}
					component="div"
					count={
						props.list.employee.filter((v)=> statusFilter==0 || statusFilter==1 && v.status || statusFilter==2 && !v.status) /* status filter */
						.filter((v)=>managerFilter=="" || v.manager==managerFilter) /* manager filter */
						.length
					}
					rowsPerPage={rowsPerPage}
					page={currentPage}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</> : <p style={{textAlign:"center"}}>There are currently no employees</p> 
		}
	</>)
}
export default ListEmployees