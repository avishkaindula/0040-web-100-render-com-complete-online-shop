const Cart = require("../models/cart.model");

function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    cart = new Cart(req.session.cart.items);
    // This else block will become active if the user already has a cart items list.
    // req.session.cart.items will take the items from the cart that was already stored in the session.
  }

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;
