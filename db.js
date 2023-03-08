const sqlite3 = require("sqlite3").verbose();

const CREATE_SATISFACTION_TABLE = `
  CREATE TABLE IF NOT EXISTS satisfaction
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    value TEXT,
    timestamp TEXT
    )
`;

const init = () => {
  const db = new sqlite3.Database("./satisfaction.db");
  db.run(CREATE_SATISFACTION_TABLE, [], (err) => {
    if (err) console.log(err);
  });
  return db;
};

exports.init = init;
