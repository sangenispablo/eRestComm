const { request, response } = require("express");
const nanoid = require("nanoid-esm");

const { productosJSON } = require("../database/config");

const productosGet = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    const productos = [];
    await productosJSON.get((obj) => {
      productos.push(obj);
    });
    res.json(productos);
  } else {
    let producto = {};
    await productosJSON.get((obj) => {
      if (obj.id === id) {
        producto = obj;
      }
    });
    res.json(producto);
  }
};

const productosPost = async (req = request, res = response) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const producto = {
    id: nanoid(),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
    timestamp: Date.now(),
  };
  await productosJSON.set(producto);
  res.json({
    producto,
  });
};

const productosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const producto = {
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };
  let idExiste = false;
  await productosJSON.get((obj) => {
    if (obj.id === id) {
      idExiste = true;
    }
  });
  if (idExiste) {
    await productosJSON.update((obj) => obj.id === id, producto);
    res.json(producto);
  } else {
    res.status(404).json({ msg: `El id ${id} no existe en la BD` });
  }
};

const productosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  let idExiste = false;
  await productosJSON.get((obj) => {
    if (obj.id === id) {
      idExiste = true;
    }
  });
  if (idExiste) {
    await productosJSON.remove((obj) => obj.id === id);
    res.json({ msg: `El id ${id} fue eliminado de la BD` });
  } else {
    res.status(404).json({ msg: `El id ${id} no existe en la BD` });
  }
};

module.exports = {
  productosGet,
  productosPut,
  productosPost,
  productosDelete,
};
