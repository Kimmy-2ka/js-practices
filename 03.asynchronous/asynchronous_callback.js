#!/usr/bin/env node
import timers from "timers/promises";
import sqlite3 from "sqlite3";

function successCase(db) {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () =>
      db.run(
        "INSERT INTO books(title) VALUES(?)",
        ["Never Let Me Go"],
        function () {
          console.log(this.lastID);
          db.get(
            "SELECT * FROM books WHERE id = ?",
            [this.lastID],
            (_err, row) => {
              console.log(row);
              db.run("DROP TABLE books");
            },
          );
        },
      ),
  );
}

function errorCase(db) {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () =>
      db.run("INSERT INTO books(title) VALUES(?)", ["Never Let Me Go"], () =>
        db.run(
          "INSERT INTO books(title) VALUES(?)",
          ["Never Let Me Go"],
          (err) => {
            if (err) {
              console.error(`${err.name}: ${err.message}`);
            }

            db.all("SELECT * FROM book ORDER BY id", (err) => {
              if (err) {
                console.error(`${err.name}: ${err.message}`);
              }

              db.run("DROP TABLE books");
            });
          },
        ),
      ),
  );
}

const db = new sqlite3.Database(":memory:");
console.log("--エラーなしのプログラム--");
successCase(db);
await timers.setTimeout(100);
console.log("--エラーありのプログラム--");
errorCase(db);
