const db = require('../config/database');

const WorkTime = {
  startSession: (user_id, callback) => {
    db.run("INSERT INTO worktime (user_id, login_time) VALUES (?, datetime('now'))", [user_id], function(err) {
      callback(err, this.lastID);
    });
  },
  endSession: (user_id, callback) => {
    db.run("UPDATE worktime SET logout_time = datetime('now') WHERE user_id = ? AND logout_time IS NULL", [user_id], function(err) {
      callback(err);
    });
  }
};

module.exports = WorkTime;
