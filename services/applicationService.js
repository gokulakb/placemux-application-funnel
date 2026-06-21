const sqlite3 = require("sqlite3").verbose();
const { v4: uuid } = require("uuid");

function getDB() {
  return new sqlite3.Database("./database/placemux.db");
}

// Apply for a job (Duplicate Check)
exports.apply = (body) => {
  return new Promise((resolve, reject) => {
    const db = getDB();

    db.get(
      `
      SELECT *
      FROM applications
      WHERE student_email = ?
      AND job_id = ?
      `,
      [body.student_email, body.job_id],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (row) {
          resolve({
            message: "You have already applied for this job"
          });

          db.close();
          return;
        }

        const id = uuid();

        db.run(
          `
          INSERT INTO applications
          VALUES (?,?,?,?,?)
          `,
          [
            id,
            body.student_name,
            body.student_email,
            body.job_id,
            "Applied"
          ],
          function (err) {
            if (err) {
              reject(err);
              return;
            }

            resolve({
              id,
              message: "Application submitted successfully"
            });

            db.close();
          }
        );
      }
    );
  });
};

// Get applications with optional status filter
exports.getApplications = (jobId, status) => {
  return new Promise((resolve, reject) => {
    const db = getDB();

    let query = `
      SELECT *
      FROM applications
      WHERE job_id = ?
    `;

    let params = [jobId];

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }

    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);

      db.close();
    });
  });
};

// Shortlist Candidate
exports.shortlist = (id) => {
  return new Promise((resolve, reject) => {
    const db = getDB();

    db.run(
      `
      UPDATE applications
      SET status = ?
      WHERE id = ?
      `,
      ["Shortlisted", id],
      function (err) {
        if (err) {
          reject(err);
          return;
        }

        if (this.changes === 0) {
          resolve({
            message: "No application found with this id"
          });
        } else {
          resolve({
            message: "Candidate shortlisted"
          });
        }

        db.close();
      }
    );
  });
};

// Get shortlisted candidates
exports.getShortlisted = () => {
  return new Promise((resolve, reject) => {
    const db = getDB();

    db.all(
      `
      SELECT *
      FROM applications
      WHERE status = ?
      `,
      ["Shortlisted"],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows);

        db.close();
      }
    );
  });
};

// Dashboard
exports.getDashboard = () => {
  return new Promise((resolve, reject) => {
    const db = getDB();

    db.get(
      `
      SELECT
        COUNT(*) AS totalApplications,

        SUM(
          CASE
            WHEN status='Shortlisted'
            THEN 1
            ELSE 0
          END
        ) AS shortlisted,

        SUM(
          CASE
            WHEN status='Applied'
            THEN 1
            ELSE 0
          END
        ) AS pending

      FROM applications
      `,
      [],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          totalApplications:
            row.totalApplications || 0,

          shortlisted:
            row.shortlisted || 0,

          pending:
            row.pending || 0
        });

        db.close();
      }
    );
  });
};