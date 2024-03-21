const knex = require("knex");
const envs = require("../config/environments");

let database = null;

const connectCommonDB = () => {
  return new Promise((resolve, reject) => {
    if (database) {
      resolve(database);
      return;
    }
    database = knex({
      client: "mysql",
      connection: {
        user: envs.DB_USER,
        host: envs.DB_HOST,
        port: envs.DB_PORT,
        database: envs.DB_NAME,
        password: envs.DB_PASSWORD,
      },
    });
    database
      .raw("SELECT 1+1 as result")
      .then(() => {
        console.log("DB Common is online");
        resolve(database);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { connectCommonDB };
