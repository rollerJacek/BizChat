const db = require('../config/database');

const User = {
  findByUsername: (username, callback) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], callback);
  },
  create: (username, password, role, department_id, callback) => {
    db.run("INSERT INTO users (username, password, role, department_id) VALUES (?, ?, ?, ?)",
      [username, password, role, department_id], function(err) {
        callback(err, this.lastID);
      });
  }
};

module.exports = User;
