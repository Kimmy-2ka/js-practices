export const run = (db, sql, params) =>
  new Promise((resolve, reject) =>
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    }),
  );

export const get = (db, sql, params) =>
  new Promise((resolve, reject) =>
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    }),
  );
