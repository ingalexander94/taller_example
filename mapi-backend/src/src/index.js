const envs = require("./config/environments");
const AppRouter = require("./routes/router");
const Server = require("./server/server");

(() => {
  main();
})();

async function main() {
  try {
    new Server(envs.PORT, AppRouter.routes).start();
  } catch (error) {
    console.error(error);
  }
}
