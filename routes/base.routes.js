const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/products");
});
// Now when a logged in user try to visit the starting page, he will be redirects to /products page.

module.exports = router;
