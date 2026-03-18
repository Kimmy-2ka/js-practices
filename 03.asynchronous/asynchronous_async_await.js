#!/usr/bin/env node
import { run, get, all } from "./modules/sqlite_promises.js";

async function successCase() {
  await run(
    `CREATE TABLE books(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE
    )`,
  );
  const statement = await run(`INSERT INTO books(title) VALUES(?)`, [
    "Never Let Me Go",
  ]);
  console.log(statement.lastID);
  const row = await get(`SELECT * FROM books WHERE id = ?`, [statement.lastID]);
  console.log(row);
  await run(`DROP TABLE books`);
}

async function errorCase() {
  await run(
    `CREATE TABLE books(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE
    )`,
  );
  await run(`INSERT INTO books(title) VALUES(?)`, ["Never Let Me Go"]);
  try {
    await run(`INSERT INTO books(title) VALUES(?)`, ["Never Let Me Go"]);
  } catch (err) {
    console.error(`${err.name}: ${err.message}`);
  }
  try {
    await all(`SELECT * FROM book ORDER BY id`);
  } catch (err) {
    console.error(`${err.name}: ${err.message}`);
  }
  await run(`DROP TABLE books`);
}

console.log("--エラーなしのプログラム--");
await successCase();
console.log("--エラーありのプログラム--");
await errorCase();
