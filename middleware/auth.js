const auth = function (req, res, next) {
  let login = req.session.login;
  let username = req.session.username;
  let notAuthenticatedUrl = ['/auth/login', '/auth/register', '/about'];
  let authUrl = ['/auth/login', '/auth/register'];

  res.locals.login = login;
  res.locals.username = username;

  console.log('Get current login session:', login);

  if (!login) {
    if (!notAuthenticatedUrl.includes(req.originalUrl)) {
      return res.redirect('/auth/login');
    }
  } else {
    if (authUrl.includes(req.originalUrl)) {
      return res.redirect('/');
    }
  }

  next();
}

module.exports = auth;
