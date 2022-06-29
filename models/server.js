const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // referencias de las apis
    this.productosPath = "/api/productos";
    this.carritoPath = "/api/carritos";
    // middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    // cors
    this.app.use(cors());
    // Parseo del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.productosPath, require("../routes/productos"));
    this.app.use(this.carritoPath, require("../routes/carritos"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
