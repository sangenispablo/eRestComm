const { request, response } = require("express");
const nanoid = require("nanoid-esm");

const { carritosJSON } = require("../database/config");
const { productosJSON } = require("../database/config");

const carritosPost = async (req = request, res = response) => {
  // Creo un carrito nuevo y devuelvo el id del mismo
  const carrito = {
    id: nanoid(),
    timestamp: Date.now(),
    productos: [],
  };
  await carritosJSON.set(carrito);
  res.json(carrito);
};

const carritosDelete = async (req = request, res = response) => {
  let idExiste = false;
  await carritosJSON.get((obj) => {
    if (obj.id === id) {
      idExiste = true;
    }
  });
  if (idExiste) {
    await carritosJSON.remove((obj) => obj.id === id);
    res.json({ msg: `El carrito con id ${id} fue eliminado de la BD` });
  } else {
    res.status(404).json({ msg: `El id ${id} no existe en la BD` });
  }
};

const carritosGet = async (req = request, res = response) => {
  const { id } = req.params;
  let idExiste = false;
  let productos = [];
  await carritosJSON.get((obj) => {
    if (obj.id === id) {
      idExiste = true;
      productos = obj.productos;
    }
  });
  if (idExiste) {
    res.json(productos);
  } else {
    res
      .status(404)
      .json({ msg: `El carrito con el id ${id} no existe en la BD` });
  }
};

const carritosPostProd = async (req = request, res = response) => {
  const { id: idCarrito } = req.params;
  const { id: idProducto } = req.body;
  // Busco el carrito
  let carritoExiste = false;
  let carrito = {};
  await carritosJSON.get((obj) => {
    if (obj.id === idCarrito) {
      carritoExiste = true;
      carrito = obj;
    }
  });
  // Busco el producto
  let productoExiste = false;
  let producto = {};
  await productosJSON.get((obj) => {
    if (obj.id === idProducto) {
      productoExiste = true;
      producto = obj;
    }
  });
  // Si ambos existen
  if (carritoExiste && productoExiste) {
    carrito.productos.push(producto);
    // ahora actualizo el carrito con los nuevos productos
    await carritosJSON.update((obj) => obj.id === idCarrito, carrito);
    res.json(carrito);
  } else {
    res.status(404).json({ msg: "El carrito o el producto no existen" });
  }
};

// En proceso de finalización
const carritosDelProd = async (req = request, res = response) => {
  const { id: idCarrito } = req.params;
  const { id_prod: idProducto } = req.params;
  // Busco el carrito
  let carritoExiste = false;
  let carrito = {};
  await carritosJSON.get((obj) => {
    if (obj.id === idCarrito) {
      carritoExiste = true;
      carrito = obj;
    }
  });
  if (carritoExiste) {
    // a los productos los filtro y los vuelvo a meter en el carrito
    let productos = carrito.productos;
    carrito.productos = productos.filter((obj) => obj.id !== idProducto);
    // ahora actualizo el carrito con los nuevos productos
    await carritosJSON.update((obj) => obj.id === idCarrito, carrito);
    res.json(carrito);
  } else {
    res.status(404).json({ msg: "El carrito no existe" });
  }
};

module.exports = {
  carritosGet,
  carritosPost,
  carritosDelete,
  carritosPostProd,
  carritosDelProd,
};
