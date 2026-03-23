#!/usr/bin/env node
import { run, get } from "./modules/sqlite_promises.js";

async function successCase() {
  await run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const statement = await run("INSERT INTO books(title) VALUES(?)", [
    "Never Let Me Go",
  ]);
  console.log(statement.lastID);
  const row = await get("SELECT * FROM books WHERE id = ?", [statement.lastID]);
  console.log(row);
  await run("DROP TABLE books");
}

async function errorCase() {
  await run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const statement = await run("INSERT INTO books(title) VALUES(?)", [
    "Never Let Me Go",
  ]);
  const bookId = statement.lastID;
  try {
    await run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"]);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      console.error(`${err.name}: ${err.message}`);
    } else {
      throw err;
    }
  }
  try {
    await get("SELECT * FROM book WHERE id = ?", [bookId]);
  } catch (err) {
    if (err.code === "SQLITE_ERROR") {
      console.error(`${err.name}: ${err.message}`);
    } else {
      throw err;
    }
  }
  await run("DROP TABLE books");
}

console.log("--エラーなしのプログラム--");
await successCase();
console.log("--エラーありのプログラム--");
await errorCase();
