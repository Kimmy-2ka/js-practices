export function createSqliteApi(db) {
  return {
    run(sql, params) {
      return new Promise((resolve, reject) =>
        db.run(sql, params, function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(this);
        }),
      );
    },

    get(sql, params) {
      return new Promise((resolve, reject) =>
        db.get(sql, params, (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row);
        }),
      );
    },
  };
}
