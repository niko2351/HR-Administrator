const express = require('express');
const employee = require('../controllers/employee.js');
const router = express.Router();

router.post('/create',(req,res,next)=>{
	if(typeof(req.body.firstName)==typeof("") && typeof(req.body.lastName)==typeof("") && typeof(req.body.telephoneNumber)==typeof("") && typeof(req.body.email)==typeof("") && typeof(req.body.manager)==typeof(""))
		next();
	else
		res.json({status:false,message:"Missing employee fields"});
},(req,res)=>{
	employee.create(req.body,(err,data)=>{
		if(err)
			res.json({message:err.message,status:false});
		else
			res.json({
				status:true,
				new:{
					id:data.id,
					status:data.status
				}
			})
	})
});
router.post('/delete',(req,res,next)=>{
	if(typeof(req.body.id)==typeof(""))
		next();
	else
		res.json({status:false,message:"Missing employee fields"});
},(req,res)=>{
	employee.update.delete(req.body,(err,data)=>{
		if(err)
			res.json({message:err.message,status:false});
		else
			res.json({
				status:true
			})
	})
});
router.post('/edit',(req,res,next)=>{
	if(typeof(req.body.id)==typeof("") && typeof(req.body.firstName)==typeof("") && typeof(req.body.lastName)==typeof("") && typeof(req.body.telephoneNumber)==typeof("") && typeof(req.body.email)==typeof("") && typeof(req.body.manager)==typeof("") && typeof(req.body.status)==typeof(""))
		next();
	else
		res.json({status:false,message:"Missing employee fields"});
},(req,res)=>{
	employee.update.one(req.body,(err,data)=>{
		if(err)
			res.json({message:err.message,status:false});
		else
			res.json({
				status:true,
				new:{
					id:data.id,
					status:data.status
				}
			})
	});
});

module.exports = router;
