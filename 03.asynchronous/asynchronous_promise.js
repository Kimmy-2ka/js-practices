#!/usr/bin/env node
import timers from "timers/promises";
import { run, get, all } from "./modules/sqlite_promises.js";

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
