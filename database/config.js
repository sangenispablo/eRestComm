const productosJSON = require("cakebase")(__dirname + "/productos.json");
const carritosJSON = require("cakebase")(__dirname + "/carritos.json");

module.exports = {
  productosJSON,
  carritosJSON,
};
