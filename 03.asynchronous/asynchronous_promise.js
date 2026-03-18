#!/usr/bin/env node
import sqlite3 from "sqlite3";
import timers from "timers/promises";
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

function all(sql, params) {
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

await timers.setTimeout(100);

run(
  `CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )`,
)
  .then(() => run(`INSERT INTO books(title) VALUES(?)`, ["Never Let Me Go"]))
  .then(() => run(`INSERT INTO books(title) VALUES(?)`, ["Never Let Me Go"]))
  .catch((err) => {
    console.error(`${err.name}: ${err.message}`);
  })
  .then(() => {
    return all(`SELECT * FROM book ORDER BY id`);
  })
  .catch((err) => {
    console.error(`${err.name}: ${err.message}`);
  })
  .then(() => {
    return run(`DROP TABLE books`);
  });
