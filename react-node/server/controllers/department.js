const db = require("./databases.js").departments;

module.exports={
	create:(data,cb)=>{
		if(data.name && data.manager){
			let id = new Date().getTime().toString(16); /* set the department ID to the hex form of the current time */ 
			db.set(id,{
				manager:data.manager,
				status:true,
				name:data.name
			});
			cb(null,{...db.get(id),id}); /* return the created object via callback function */
		}
		else
			cb(new Error("Missing department fields"));
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
					manager:data.manager,
					status:data.status,
					name:data.name
				});
				cb();
			}
			else
				cb(new Error("Employee doesn't exist"));
		}
	},
	get:{
		list:()=>{
			let retVal = [];
			for(const [id,data] of db){
				retVal.push({
					...data,
					id
				});
			}
			return retVal;
		}
	}
};