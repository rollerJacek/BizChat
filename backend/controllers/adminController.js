const db = require('../config/database');

exports.createUser = (req, res) => {
  const { username, password, role, department_id } = req.body;
  db.run("INSERT INTO users (username, password, role, department_id) VALUES (?, ?, ?, ?)", 
    [username, password, role, department_id], function(err) {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ id: this.lastID, username, role, department_id });
    });
};

exports.getUsers = (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
};
