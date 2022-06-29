const { Router } = require("express");
// const { check } = require("express-validator");

// const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

// importo los controladores para cada endpoint
const {
  carritosGet,
  carritosPost,
  carritosDelete,
  carritosPostProd,
  carritosDelProd,
} = require("../controllers/carritos");

router.post("/", carritosPost);
router.delete("/:id", carritosDelete);
router.get("/:id/productos", carritosGet);
router.post("/:id/productos", carritosPostProd);
router.delete("/:id/productos/:id_prod", carritosDelProd);

module.exports = router;
