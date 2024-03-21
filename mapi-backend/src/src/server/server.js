const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

class Server {
  constructor(port, routes) {
    this.app = express();
    this.port = port;
    this.routes = routes;
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(
      fileUpload({
        abortOnLimit: true,
        limits: {
          fileSize: 1 * 1024 * 1024,
        },
        responseOnLimit: JSON.stringify({
          status: false,
          data: null,
          error: "El tamaño del archivo supera 1MB",
        }),
      })
    );

    this.app.use(this.routes);
  }

  start() {
    this.middlewares();
    this.app.listen(
      this.port,
      console.log(`Server listen on port ${this.port}`)
    );
  }
}

module.exports = Server;
