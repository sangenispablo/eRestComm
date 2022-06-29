const { Router } = require("express");

const { isAdmin } = require("../middlewares/isAdmin");
const router = Router();

// importo los controladores para cada endpoint
const {
  productosGet,
  productosPost,
  productosPut,
  productosDelete,
} = require("../controllers/productos");

router.get("/:id?", productosGet);
router.put("/:id", isAdmin, productosPut);
router.post("/", isAdmin, productosPost);
router.delete("/:id", isAdmin, productosDelete);

module.exports = router;
