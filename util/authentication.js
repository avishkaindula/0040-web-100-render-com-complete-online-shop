function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  // .session is a property that was made available by the express-session package.
  // user will be the existingUser we pass through auth.controller.js which contains user data
  // from the mongodb store.
  // The id in the mongodb database is stored as a objectid. Therefor, we need to convert it
  // back to string by using .toString() and now we can save that.
  req.session.save(action);
}

function destroyUserAuthSession(req) {
  req.session.uid = null;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
