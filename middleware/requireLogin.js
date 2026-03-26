module.exports = function requireLogin(req, res, next) {
  if (req.session && req.session.isLoggedIn) {
    return next(); // logged in — let them through
  }
  res.redirect('/login'); // not logged in — send to login
};