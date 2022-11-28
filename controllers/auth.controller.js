const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    res.redirect("/signup");
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      res.redirect("/signup");
      return;
    }

    await user.signup();
    // This will trigger the signup method inside User class
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  // This will assign email and password by extracting them through the request
  // and assign them to email and password parameters of User class and omit fullname, street,
  // postal and city parameters.
  let existingUser;
  try {
    // const existingUser = await user.getUserWithSameEmail();
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
    // this function is the action parameter of createUserSession in authentication.js file.
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
