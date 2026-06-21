const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/placemux.db");

db.serialize(() => {

  db.run(`
  CREATE TABLE IF NOT EXISTS jobs(
      id TEXT PRIMARY KEY,
      title TEXT,
      company TEXT
  )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS applications(
      id TEXT PRIMARY KEY,
      student_name TEXT,
      student_email TEXT,
      job_id TEXT,
      status TEXT
  )
  `);

  db.run(`
  INSERT OR IGNORE INTO jobs
  VALUES(
      'job1',
      'Backend Developer',
      'Tech Corp'
  )
  `);

});

console.log("Database created successfully");
db.close();