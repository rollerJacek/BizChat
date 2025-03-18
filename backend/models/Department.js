const db = require('../config/database');

const Department = {
  create: (name, manager_id, callback) => {
    db.run("INSERT INTO departments (name, manager_id) VALUES (?, ?)", [name, manager_id], function(err) {
      callback(err, this.lastID);
    });
  },
  getAll: (callback) => {
    db.all("SELECT * FROM departments", [], callback);
  }
};

module.exports = Department;
