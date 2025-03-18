const db = require('../config/database');

const ChatMessage = {
  getAll: (callback) => {
    db.all("SELECT * FROM chat_messages ORDER BY timestamp ASC", [], callback);
  },
  create: (user_id, message, callback) => {
    db.run("INSERT INTO chat_messages (user_id, message) VALUES (?, ?)", [user_id, message], function(err) {
      callback(err, this.lastID);
    });
  }
};

module.exports = ChatMessage;
