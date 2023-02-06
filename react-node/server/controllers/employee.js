const db = require("./databases.js").employees;

module.exports={
	create:(data,cb)=>{
		if(data.firstName && data.lastName && data.email && data.telephoneNumber){
			let id = new Date().getTime().toString(16); /* set the employee ID to the hex form of the current time */ 
			db.set(id,{
				password:"Password123#",
				department:"",
				manager:data.manager ? data.manager : "",
				status:true,
				email:data.email,
				telephoneNumber:data.telephoneNumber,
				lastName:data.lastName,
				firstName:data.firstName
			});
			cb(null,{...db.get(id),id}); /* return the created object via callback function */
		}
		else
			cb(new Error("Missing employee fields"));
	},
	update:{
		delete:(data,cb)=>{
			if(db.has(data.id))
				db.delete(data.id);
			cb();
		},
		one:(data,cb)=>{
			if(db.has(data.id)){
				let prev = db.get(data.id);
				db.set(data.id,{
					password:prev.password,
					manager:data.manager ? data.manager : "",
					status:true,
					email:data.email,
					department:data.department,
					telephoneNumber:data.telephoneNumber,
					lastName:data.lastName,
					firstName:data.firstName
				});
				cb();
			}
			else
				cb(new Error("Employee doesn't exist"));
		},
		department:(data)=>{
			for(const [id,emp] of db){
				if(emp.department===data.id)
					emp.department="";
			}
		}
	},
	get:{
		one:(data,cb)=>{
			cb(null,db.get(data.id));
		},
		list:()=>{
			let retVal = [];
			for(const [id,data] of db){
				retVal.push({
					...data,
					password:null,
					id:id
				});
			}
			return retVal;
		}
	}
};