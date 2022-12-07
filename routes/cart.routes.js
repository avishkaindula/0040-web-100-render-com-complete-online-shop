const express = require("express");

const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", cartController.getCart);
// This is actually /cart/ route.

router.post("/items", cartController.addCartItem);

router.patch("/items", cartController.updateCartItem);
// patch is used for scenes where we only updates some parts of already existing data.
// In this route we only update the quantity of a single product item which 
// the user is gonna buy. So we can use router.patch() for that.
module.exports = router;
