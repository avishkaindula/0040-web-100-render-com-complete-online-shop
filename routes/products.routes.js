const express = require("express");

const productsController = require("../controllers/products.controller");

const router = express.Router();

// router.get("/products", function (req, res) {
//   res.render("customer/products/all-products");
// });
router.get("/products", productsController.getAllProducts);

router.get("/products/:id", productsController.getProductDetails);

module.exports = router;
