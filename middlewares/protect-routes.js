module.exports = protectRoutes;

function protectRoutes(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
    // 401 pages tells that the user is not authenticated.
  }

  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");
    // 403 pages tells that the user is not authorized.
  }

  next();
}

module.exports = protectRoutes;
