#!/usr/bin/env node
import sqlite3 from "sqlite3";
import { createSqliteApi } from "./modules/sqlite_promises.js";

async function successCase(api) {
  await api.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const statement = await api.run("INSERT INTO books(title) VALUES(?)", [
    "Never Let Me Go",
  ]);
  console.log(statement.lastID);
  const row = await api.get("SELECT * FROM books WHERE id = ?", [
    statement.lastID,
  ]);
  console.log(row);
  await api.run("DROP TABLE books");
}

async function errorCase(api) {
  await api.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const statement = await api.run("INSERT INTO books(title) VALUES(?)", [
    "Never Let Me Go",
  ]);
  const bookId = statement.lastID;
  try {
    await api.run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      console.error(`${err.name}: ${err.message}`);
    } else {
      throw err;
    }
  }
  try {
    await api.get("SELECT * FROM book WHERE id = ?", [bookId]);
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(`${err.name}: ${err.message}`);
    } else {
      throw err;
    }
  }
  await api.run("DROP TABLE books");
}

const db = new sqlite3.Database(":memory:");
const api = createSqliteApi(db);

console.log("--エラーなしのプログラム--");
await successCase(api);
console.log("--エラーありのプログラム--");
await errorCase(api);
