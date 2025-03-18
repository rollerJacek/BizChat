const db = require('../config/database');

exports.createTask = (req, res) => {
  const { assigned_to, description, department_id } = req.body;
  const creator_id = req.user.id;
  db.run("INSERT INTO tasks (creator_id, assigned_to, description, status, department_id) VALUES (?, ?, ?, 'new', ?)",
    [creator_id, assigned_to, description, department_id], function(err) {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ id: this.lastID, creator_id, assigned_to, description, status: 'new', department_id });
    });
};

exports.getTasks = (req, res) => {
  const userRole = req.user.role;
  const userId = req.user.id;
  if (userRole === 'kierownik') {
    db.all("SELECT * FROM tasks WHERE department_id = (SELECT department_id FROM users WHERE id = ?)", [userId], (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(rows);
    });
  } else {
    db.all("SELECT * FROM tasks WHERE assigned_to = ?", [userId], (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(rows);
    });
  }
};

exports.updateTaskStatus = (req, res) => {
  const { taskId, status } = req.body;
  db.run("UPDATE tasks SET status = ? WHERE id = ?", [status, taskId], function(err) {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Task status updated" });
  });
};

exports.addTaskComment = (req, res) => {
  const { taskId, comment } = req.body;
  db.get("SELECT description FROM tasks WHERE id = ?", [taskId], (err, row) => {
    if (err || !row) return res.status(500).json({ error: "Task not found" });
    const updatedDescription = row.description + "\nComment: " + comment;
    db.run("UPDATE tasks SET description = ? WHERE id = ?", [updatedDescription, taskId], function(err) {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Comment added" });
    });
  });
};
