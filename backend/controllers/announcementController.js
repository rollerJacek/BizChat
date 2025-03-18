const db = require('../config/database');

exports.createAnnouncement = (req, res) => {
  const { message } = req.body;
  const author_id = req.user.id;
  db.run("INSERT INTO announcements (author_id, message) VALUES (?, ?)", [author_id, message], function(err) {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ id: this.lastID, author_id, message, timestamp: new Date() });
  });
};

exports.getAnnouncements = (req, res) => {
  db.all("SELECT * FROM announcements ORDER BY timestamp DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
};
