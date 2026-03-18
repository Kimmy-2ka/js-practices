#!/usr/bin/env node
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

function createBooksTable() {
  return new Promise((resolve) => {
    db.run(
      `CREATE TABLE books(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL UNIQUE
      )`,
      function () {
        resolve();
      },
    );
  });
}

function insertBook() {
  return new Promise((resolve) => {
    db.run(
      `INSERT INTO books(title) VALUES(?)`,
      ["Never Let Me Go"],
      function () {
        resolve(this.lastID);
      },
    );
  });
}

function findBook(id) {
  return new Promise((resolve) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [id], function (_err, row) {
      resolve(row);
    });
  });
}

function dropBooksTable() {
  return new Promise((resolve) => {
    db.run(`DROP TABLE books`, function () {
      resolve();
    });
  });
}

createBooksTable()
  .then(insertBook)
  .then((id) => {
    console.log(id);
    return findBook(id);
  })
  .then((row) => {
    console.log(row);
    return dropBooksTable();
  });
