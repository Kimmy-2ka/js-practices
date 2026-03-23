#!/usr/bin/env node
import timers from "timers/promises";
import { run, get } from "./modules/sqlite_promises.js";

function successCase() {
  run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]))
    .then((statement) => {
      console.log(statement.lastID);
      return get("SELECT * FROM books WHERE id = ?", [statement.lastID]);
    })
    .then((row) => {
      console.log(row);
      return run("DROP TABLE books");
    });
}

function errorCase() {
  let bookId;

  run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]))
    .then((statement) => {
      bookId = statement.lastID;
      return run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]);
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    })
    .then(() => {
      return get("SELECT * FROM book WHERE id = ?", [bookId]);
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    })
    .then(() => {
      return run("DROP TABLE books");
    });
}

console.log("--エラーなしのプログラム--");
successCase();
await timers.setTimeout(100);
console.log("--エラーありのプログラム--");
errorCase();
