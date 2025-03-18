const db = require('../config/database');

exports.submitRequest = (req, res) => {
  const { type, start_date, end_date } = req.body;
  const user_id = req.user.id;
  db.run("INSERT INTO hr_requests (user_id, type, start_date, end_date, status) VALUES (?, ?, ?, ?, 'pending')",
    [user_id, type, start_date, end_date], function(err) {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ id: this.lastID, user_id, type, start_date, end_date, status: 'pending' });
    });
};

exports.getRequests = (req, res) => {
  const userRole = req.user.role;
  const userId = req.user.id;
  if (userRole === 'kierownik') {
    db.all(`SELECT hr_requests.*, users.department_id FROM hr_requests 
            JOIN users ON hr_requests.user_id = users.id 
            WHERE users.department_id = (SELECT department_id FROM users WHERE id = ?)`,
            [userId], (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(rows);
    });
  } else {
    db.all("SELECT * FROM hr_requests WHERE user_id = ?", [userId], (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(rows);
    });
  }
};

exports.updateRequestStatus = (req, res) => {
  const { requestId, status } = req.body;
  db.run("UPDATE hr_requests SET status = ? WHERE id = ?", [status, requestId], function(err) {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Request updated" });
  });
};
