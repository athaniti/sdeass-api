module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  // Create a new Customer
  app.post("/employees", employees.create);

  // Retrieve all Customers
  app.get("/employees", employees.findAll);

  // Retrieve a single Customer with employeeId
  app.get("/employees/:employeeId", employees.findOne);

  // Update a Customer with employeeId
  app.put("/employees/:employeeId", employees.update);

  // Delete a Customer with employeeId
  app.delete("/employees/:employeeId", employees.delete);

  // Create a new Customer
  app.delete("/employees", employees.deleteAll);
};