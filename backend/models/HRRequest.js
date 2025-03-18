const db = require('../config/database');

const HRRequest = {
  create: (user_id, type, start_date, end_date, callback) => {
    db.run("INSERT INTO hr_requests (user_id, type, start_date, end_date, status) VALUES (?, ?, ?, ?, 'pending')",
      [user_id, type, start_date, end_date], function(err) {
        callback(err, this.lastID);
      });
  },
  getByUser: (user_id, callback) => {
    db.all("SELECT * FROM hr_requests WHERE user_id = ?", [user_id], callback);
  }
};

module.exports = HRRequest;
