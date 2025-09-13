const db = require('../config/database');

exports.getMessages = async (req, res) => {
  const query = `
  SELECT m.id, u.username, m.message, m.timestamp
  FROM chat_messages AS m
  JOIN users AS u ON m.user_id = u.id
  ORDER BY m.timestamp ASC
`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.sendMessage = (req, res) => {
  const { message } = req.body;
  const user_id = req.user.id;
  db.run("INSERT INTO chat_messages (user_id, message) VALUES (?, ?)", [user_id, message], function (err) {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ id: this.lastID, message, user_id, timestamp: new Date() });
  });
};