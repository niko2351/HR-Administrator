const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user =require("./controllers/user.js");
const department = {
	route:require("./routes/department.js"),
	controller:require("./controllers/department.js")
};
const employee = {
	route:require("./routes/employee.js"),
	controller:require("./controllers/employee.js")
};
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.send("received GET request");
});

app.post('/',(req,res,next)=>{
	if(typeof(req.body.username)==typeof("") && typeof(req.body.password)==typeof(""))
		next();
	else
		res.json({status:false,message:"No matching username/password pair"});
},(req,res)=>{
	user.get.login(req.body,(err,obj)=>{
		if(err)
			res.json({status:false,message:err.message});
		else
			res.json({status:true,url:"/hrDashboard"});
	});
});
app.get('/list',(req,res)=>{
	res.json({department:department.controller.get.list(),employee:employee.controller.get.list()});
});

app.use('/employee',employee.route);
app.use('/department',department.route);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
