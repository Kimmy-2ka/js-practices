#!/usr/bin/env node
import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { run, get } from "./modules/sqlite_promises.js";

function successCase(db) {
  run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() =>
      run(db, "INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]),
    )
    .then((statement) => {
      console.log(statement.lastID);
      return get(db, "SELECT * FROM books WHERE id = ?", [statement.lastID]);
    })
    .then((row) => {
      console.log(row);
      return run(db, "DROP TABLE books");
    });
}

function errorCase(db) {
  let bookId;

  run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() =>
      run(db, "INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]),
    )
    .then((statement) => {
      bookId = statement.lastID;
      return run(db, "INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]);
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
      return get(db, "SELECT * FROM book WHERE id = ?", [bookId]);
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
      return run(db, "DROP TABLE books");
    });
}

const db = new sqlite3.Database(":memory:");

console.log("--エラーなしのプログラム--");
successCase(db);
await timers.setTimeout(100);
console.log("--エラーありのプログラム--");
errorCase(db);
