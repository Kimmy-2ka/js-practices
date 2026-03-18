#!/usr/bin/env node
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

function run(sql, params) {
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

function get(sql, params) {
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

run(
  `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`,
)
  .then(() => run(`INSERT INTO books(title) VALUES(?)`, ["Never Let Me Go"]))
  .then((statement) => {
    console.log(statement.lastID);
    return get(`SELECT * FROM books WHERE id = ?`, [statement.lastID]);
  })
  .then((row) => {
    console.log(row);
    return run(`DROP TABLE books`);
  });
