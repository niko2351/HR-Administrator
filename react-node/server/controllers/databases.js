const usersDatabase = new Map();
const employeesDatabase = new Map();
const departmentsDatabase = new Map();

usersDatabase.set("hradmin@test.com","TestPass1234"); /* preloading the HR Admin user */

module.exports={
	users:usersDatabase,
	departments:departmentsDatabase,
	employees:employeesDatabase
};