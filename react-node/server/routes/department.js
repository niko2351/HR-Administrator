const express = require('express');
const department = require('../controllers/department.js');
const employee = require('../controllers/employee.js');
const router = express.Router();

router.post('/create',(req,res,next)=>{
	if(typeof(req.body.name)==typeof("") && typeof(req.body.manager)==typeof("")){
		employee.get.one({id:req.body.manager},(err,obj)=>{
			if(err || !obj)
				res.json({status:false,message:err ? err.message : "Invalid/missing employee field"});
			else
				next();
		})
	}
	else
		res.json({status:false,message:"Missing department fields"});
},(req,res)=>{
	department.create(req.body,(err,data)=>{
		if(err)
			return res.json({message:err.message,status:false});
		else
			return res.json({
				status:true,
				new:{
					id:data.id,
					status:data.status
				}
			});
	})
});
router.post('/delete',(req,res,next)=>{
	if(typeof(req.body.id)==typeof(""))
		next();
	else
		res.json({status:false,message:"Missing department fields"});
},(req,res)=>{
	department.update.delete(req.body,(err,data)=>{
		if(err)
			res.json({message:err.message,status:false});
		else
			res.json({
				status:true
			})
	})
});
router.post('/edit',(req,res,next)=>{
	if(typeof(req.body.id)==typeof("") && typeof(req.body.name)==typeof("") && typeof(req.body.manager)==typeof("") && typeof(req.body.status)==typeof(""))
		next();
	else
		res.json({status:false,message:"Missing department fields"});
},(req,res)=>{
	department.update.one(req.body,(err,data)=>{
		if(err)
			res.json({message:err.message,status:false});
		else
			res.json({
				status:true
			})
	});
});

module.exports = router;