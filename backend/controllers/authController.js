const jwt = require('jsonwebtoken');
const db = require('../config/database');
const secretKey = 'yourSecretKey';

// Logowanie – weryfikacja użytkownika i rejestracja czasu pracy
exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '8h' });
    db.run("INSERT INTO worktime (user_id, login_time) VALUES (?, datetime('now'))", [user.id]);
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  });
};

exports.logout = (req, res) => {
  const userId = req.user.id;
  db.run("UPDATE worktime SET logout_time = datetime('now') WHERE user_id = ? AND logout_time IS NULL", [userId], function(err) {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Logged out successfully" });
  });
};
