const Order = require("../models/order.model");
const User = require("../models/user.model");

function getOrders(req, res) {
  res.render("customer/orders/all-orders");
}

async function addOrder(req, res) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);
  // these are the data needed for => constructor(cart, userData, status = "pending", date, orderId) {
  // status, date, orderId doesn't needed to be set.

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;
  // This will clear the cart after the order was set.

  res.redirect("/orders");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
