import { run, get } from "./modules/sqlite_promises.js";

async function runSuccessCase() {
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

runSuccessCase();
