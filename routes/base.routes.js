const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/products");
});
// Now when a user try to visit the starting page, he will be redirected to /products page.
// Whether the user is logged in or not, it doesn't matter. All users will be redirected to /products

module.exports = router;
