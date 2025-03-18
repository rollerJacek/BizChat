const db = require('../config/database');

const Task = {
  create: (creator_id, assigned_to, description, department_id, callback) => {
    db.run("INSERT INTO tasks (creator_id, assigned_to, description, status, department_id) VALUES (?, ?, ?, 'new', ?)",
      [creator_id, assigned_to, description, department_id], function(err) {
        callback(err, this.lastID);
      });
  },
  getByUser: (user_id, callback) => {
    db.all("SELECT * FROM tasks WHERE assigned_to = ?", [user_id], callback);
  },
  getByDepartment: (department_id, callback) => {
    db.all("SELECT * FROM tasks WHERE department_id = ?", [department_id], callback);
  }
};

module.exports = Task;
