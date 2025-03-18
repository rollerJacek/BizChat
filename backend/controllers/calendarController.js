const db = require('../config/database');

exports.getCalendarData = (req, res) => {
  db.all("SELECT * FROM hr_requests", [], (err, hrRequests) => {
    if (err) return res.status(500).json({ error: "Database error" });
    db.all("SELECT * FROM worktime", [], (err, worktime) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ hrRequests, worktime });
    });
  });
};
