const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.post("/", ordersController.addOrder);
// This is the /orders/ route.
// The /orders prefix is written inside app.use("/orders", ordersRoutes)

router.get("/", ordersController.getOrders);

module.exports = router;
