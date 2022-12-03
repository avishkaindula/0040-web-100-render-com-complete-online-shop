const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/products");
});
// Now when a user try to visit the starting page, he will be redirected to /products page.
// Whether the user is logged in or not, it doesn't matter. All users will be redirected to /products

router.get("/401", function(req, res) {
  res.status(401).render("shared/401")
});

router.get("/403", function(req, res) {
  res.status(403).render("shared/403")
});

module.exports = router;
