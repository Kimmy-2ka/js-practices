#!/usr/bin/env node
import sqlite3 from "sqlite3";
import { run, get } from "./modules/sqlite_promises.js";

async function successCase(db) {
  await run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const statement = await run(db, "INSERT INTO books(title) VALUES(?)", [
    "Never Let Me Go",
  ]);
  console.log(statement.lastID);
  const row = await get(db, "SELECT * FROM books WHERE id = ?", [
    statement.lastID,
  ]);
  console.log(row);
  await run(db, "DROP TABLE books");
}

async function errorCase(db) {
  await run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const statement = await run(db, "INSERT INTO books(title) VALUES(?)", [
    "Never Let Me Go",
  ]);
  const bookId = statement.lastID;
  try {
    await run(db, "INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]);
  } catch (err) {
    if (err instanceof Error && err.code === "SQLITE_CONSTRAINT") {
      console.error(`${err.name}: ${err.message}`);
    } else {
      throw err;
    }
  }
  try {
    await get(db, "SELECT * FROM book WHERE id = ?", [bookId]);
  } catch (err) {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(`${err.name}: ${err.message}`);
    } else {
      throw err;
    }
  }
  await run(db, "DROP TABLE books");
}

const db = new sqlite3.Database(":memory:");

console.log("--エラーなしのプログラム--");
await successCase(db);
console.log("--エラーありのプログラム--");
await errorCase(db);
