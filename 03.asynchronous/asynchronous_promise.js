#!/usr/bin/env node
import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { createSqliteApi } from "./modules/sqlite_promises.js";

function successCase(api) {
  api
    .run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    )
    .then(() =>
      api.run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]),
    )
    .then((statement) => {
      console.log(statement.lastID);
      return api.get("SELECT * FROM books WHERE id = ?", [statement.lastID]);
    })
    .then((row) => {
      console.log(row);
      return api.run("DROP TABLE books");
    });
}

function errorCase(api) {
  let bookId;

  api
    .run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    )
    .then(() =>
      api.run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]),
    )
    .then((statement) => {
      bookId = statement.lastID;
      return api.run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]);
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
      return api.get("SELECT * FROM book WHERE id = ?", [bookId]);
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
      return api.run("DROP TABLE books");
    });
}

const db = new sqlite3.Database(":memory:");
const api = createSqliteApi(db);

console.log("--エラーなしのプログラム--");
successCase(api);
await timers.setTimeout(100);
console.log("--エラーありのプログラム--");
errorCase(api);
