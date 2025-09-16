const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  // Tabela użytkowników
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    department_id INTEGER
  )`);

  // Tabela rejestrująca czas pracy
  db.run(`CREATE TABLE IF NOT EXISTS worktime (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    login_time DATETIME,
    logout_time DATETIME
  )`);

  // Tabela wiadomości czatu
  db.run(`CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela zgłoszeń HR (urlopy, praca zdalna)
  db.run(`CREATE TABLE IF NOT EXISTS hr_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT
  )`);

  // Tabela zadań
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id INTEGER,
    assigned_to INTEGER,
    description TEXT,
    status TEXT,
    department_id INTEGER
  )`);

  // Tabela ogłoszeń
  db.run(`CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela działów
  db.run(`CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    manager_id INTEGER
  )`);
  
    // Dodanie domyślnego konta admina, jeśli nie istnieje
    db.get("SELECT * FROM users WHERE username = ?", ['admin'], (err, row) => {
      if (err) {
        console.error("Błąd przy sprawdzaniu konta admina:", err);
      } else if (!row) {
        // W środowisku produkcyjnym pamiętaj o hashowaniu hasła!
        db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ['admin', 'admin123', 'admin'], function(err) {
          if (err) {
            console.error("Błąd przy dodawaniu konta admina:", err);
          } else {
            console.log("Defaultowe konto admina zostało utworzone.");
          }
        });
      } else {
        console.log("Konto admina już istnieje.");
      }
    });

        // Dodanie domyślnego konta admina, jeśli nie istnieje
    db.get("SELECT * FROM users WHERE username = ?", ['Jan Kowalski'], (err, row) => {
      if (err) {
        console.error("Błąd przy sprawdzaniu konta Jan Kowalski:", err);
      } else if (!row) {
        // W środowisku produkcyjnym pamiętaj o hashowaniu hasła!
        db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ['Jan Kowalski', 'admin', 'admin'], function(err) {
          if (err) {
            console.error("Błąd przy dodawaniu konta Jan Kowalski:", err);
          } else {
            console.log("Defaultowe konto Jan Kowalski zostało utworzone.");
          }
        });
      } else {
        console.log("Konto Jan Kowalski już istnieje.");
      }
    });

        // Dodanie domyślnego konta admina, jeśli nie istnieje
    db.get("SELECT * FROM users WHERE username = ?", ['Marta Nowak'], (err, row) => {
      if (err) {
        console.error("Błąd przy sprawdzaniu konta Marta Nowak:", err);
      } else if (!row) {
        // W środowisku produkcyjnym pamiętaj o hashowaniu hasła!
        db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", ['Marta Nowak', 'admin', 'admin'], function(err) {
          if (err) {
            console.error("Błąd przy dodawaniu konta Marta Nowak:", err);
          } else {
            console.log("Defaultowe konto Marta Nowak zostało utworzone.");
          }
        });
      } else {
        console.log("Konto Marta Nowak już istnieje.");
      }
    });
});

module.exports = db;
