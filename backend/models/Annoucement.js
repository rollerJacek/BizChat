const db = require('../config/database');

const Announcement = {
  create: (author_id, message, callback) => {
    db.run("INSERT INTO announcements (author_id, message) VALUES (?, ?)", [author_id, message], function(err) {
      callback(err, this.lastID);
    });
  },
  getAll: (callback) => {
    db.all("SELECT * FROM announcements ORDER BY timestamp DESC", [], callback);
  }
};

module.exports = Announcement;
