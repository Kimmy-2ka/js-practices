import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

export function run(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

export function get(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

export function all(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}
