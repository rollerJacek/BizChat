const express = require('express');
const router = express.Router();
const db = require('../config/database');
const authMiddleware = require('../middlewares/authMiddleware');

// Pobranie listy użytkowników (np. id i username)
router.get('/', authMiddleware, (req, res) => {
  db.all("SELECT id, username FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

module.exports = router;
