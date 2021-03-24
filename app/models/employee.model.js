const sql = require("./db.js");

// constructor
const Employee = function(employee) {
  this.email = employee.email;
  this.fname = employee.fname;
  this.lname = employee.lname;
};

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO sdeusers SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (employeeId, result) => {
  sql.query(`SELECT * FROM sdeusers WHERE UserID = ${employeeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = result => {
  sql.query("SELECT * FROM sdeusers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employees: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, employee, result) => {
  sql.query(
    "UPDATE sdeusers SET Email = ?, UserFname = ?, UserLname = ? WHERE UserID = ?",
    [employee.email, employee.fname, employee.lname, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM sdeusers WHERE UserID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM sdeusers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employees`);
    result(null, res);
  });
};

module.exports = Employee;