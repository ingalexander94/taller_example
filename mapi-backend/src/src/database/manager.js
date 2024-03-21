const knex = require("knex");
const cache = require("memory-cache");
const { connectCommonDB } = require("./common");

async function getConstants() {
  let clients;
  const commonDBConnection = await connectCommonDB();
  clients = await commonDBConnection.select("*").from("mp_clients");
  let connectionMap = [];

  for (const client of clients) {
    const connection = {
      [client.client_subdomain]: async () => {
        let db = knex(createConnectionConfig(client));
        return new Promise((resolve, _) => {
          db.raw("SELECT 1")
            .then(() => {
              console.log(
                `DB Client ${client.client_subdomain.toUpperCase()} is online`
              );
              resolve(db);
            })
            .catch((error) => {
              console.log({ error });
              resolve(null);
            });
        });
      },
    };
    connectionMap.push(connection);
  }

  connectionMap = connectionMap.reduce((prev, next) => {
    return Object.assign({}, prev, next);
  }, {});

  cache.put("constants", connectionMap);
}

function createConnectionConfig(client) {
  const clientDBConnetion = {
    client: "mysql",
    connection: {
      host: client.client_db_host,
      port: client.client_db_port,
      user: client.client_db_user,
      database: client.client_db_name,
      password: client.client_db_password,
    },
    pool: { min: 2, max: 2000 },
  };
  return clientDBConnetion;
}

async function getConnectionBySubdomain(subdomain) {
  let constants = cache.get("constants");
  if (!constants || !constants[subdomain]) {
    cache.clear();
    await getConstants();
  }
  constants = cache.get("constants");
  const connection = constants[subdomain];
  return connection ? connection : undefined;
}

module.exports = {
  getConstants,
  getConnectionBySubdomain,
};
