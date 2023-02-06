const db = require("./databases.js").users;

module.exports={
	get:{
		login:(data,cb)=>{
			for(const [user,password] of db){
				if(user==data.username && password==data.password)
					return cb();
			}
			cb(new Error("No matching username/password pair"));
		}
	}
};
