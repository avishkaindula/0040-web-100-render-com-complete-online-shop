const Order = require("../models/order.model");
const User = require("../models/user.model");

const stripe = require("stripe")(
  "sk_test_51MCzPdIBMz7kUM6UfJmiMLHjiTuxyG1tbU4Tp4sbT2ao1Fn4m3jANI3R7mMDR50NfL2CPhbN1rJBpJj3HDkVBlT600C5WivWhd"
);
// This is same as follows
// const stripe = require("stripe");
// const stripeObj = stripe("sk_test_51MCzPdIBMz7kUM6UfJmiMLHjiTuxyG1tbU4Tp4sbT2ao1Fn4m3jANI3R7mMDR50NfL2CPhbN1rJBpJj3HDkVBlT600C5WivWhd");

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  // This cart can also be used to populate line_items with cart data.
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

  const session = await stripe.checkout.sessions.create({
    // the .sessions here has nothing to do with our own session.
    // .sessions is more general term in here.
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
          // This will give the price in cents. Therefor we need to multiply it by 100
        },
        // This is a object that describes the price just in time for the specific transaction without
        // any data being stored on stripe's servers.
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: "http://localhost:3000/orders/success",
    cancel_url: "http://localhost:3000/orders/failure",
    // These are routes created on orders.routes.js file.
  });

  res.redirect(303, session.url);
  // We redirect the user to stripe's website here.
  // So in that site, the payment can be made in a secure environment.
  // Then once the payment is completed, the user is redirected to either to
  // http://localhost:3000/orders/success or http://localhost:3000/orders/failure routes on our site.
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}

function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure,
};
