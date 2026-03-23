#!/usr/bin/env node
import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function successCase() {
  db.run(
    `CREATE TABLE books(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE
    )`,
    function () {
      db.run(
        `INSERT INTO books(title) VALUES(?)`,
        ["Never Let Me Go"],
        function () {
          console.log(this.lastID);
          db.get(
            `SELECT * FROM books WHERE id = ?`,
            [this.lastID],
            function (_err, row) {
              console.log(row);
              db.run(`DROP TABLE books`);
            },
          );
        },
      );
    },
  );
}

function errorCase() {
  db.run(
    `CREATE TABLE books(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE
    )`,
    function () {
      db.run(
        `INSERT INTO books(title) VALUES(?)`,
        ["Never Let Me Go"],
        function () {
          db.run(
            `INSERT INTO books(title) VALUES(?)`,
            ["Never Let Me Go"],
            function (err) {
              if (err) console.error(`${err.name}: ${err.message}`);

              db.all(`SELECT * FROM book ORDER BY id`, function (err) {
                if (err) console.error(`${err.name}: ${err.message}`);

                db.run(`DROP TABLE books`);
              });
            },
          );
        },
      );
    },
  );
}

console.log("--エラーなしのプログラム--");
successCase();
await timers.setTimeout(100);
console.log("--エラーありのプログラム--");
errorCase();
